package com.gitgud.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.gitgud.config.Constants;
import com.gitgud.domain.Authority;
import com.gitgud.domain.Image;
import com.gitgud.domain.RealState;
import com.gitgud.domain.User;
import com.gitgud.repository.AuthorityRepository;
import com.gitgud.repository.RealStateRepository;
import com.gitgud.repository.UserRepository;
import com.gitgud.security.AuthoritiesConstants;
import com.gitgud.security.SecurityUtils;
import com.gitgud.service.dto.UserDTO;
import com.gitgud.service.util.CloudinaryUtil;
import com.gitgud.service.util.RandomUtil;
import com.gitgud.web.rest.errors.*;

import dev.morphia.Datastore;
import dev.morphia.query.Query;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Service class for managing users.
 */
@Service
public class UserService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthorityRepository authorityRepository;

    private final MailService mailService;

    private final RealStateRepository realStateRepository;

    @Autowired
    private Datastore datastore;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthorityRepository authorityRepository, MailService mailService, RealStateRepository realStateRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityRepository = authorityRepository;
        this.mailService = mailService;
        this.realStateRepository = realStateRepository;
    }
    public  User getUserById (String id) {
        Optional<User> user =  userRepository.findById(id);
        if(user.isPresent()){
            return user.get();
        }
        return null;
    }
    public Optional<User> getUserByEmail(String email){
        return userRepository.findOneByLogin(email);
    }

    public List<User> getUsersByRaiting(double raiting){
        List<User> resultUser = new ArrayList<User>();
        Optional<List<User>> dbResult = userRepository.findByRaitingGreaterThan(raiting);
        if(dbResult.isPresent()){
            resultUser = dbResult.get();
        }
        return  resultUser;
    }
    public Optional<User> activateRegistration(String key) {
        log.debug("Activating user for activation key {}", key);
        return userRepository.findOneByActivationKey(key)
            .map(user -> {
                // activate given user for the registration key.
                user.setActivated(true);
                user.setActivationKey(null);
                userRepository.save(user);
                log.debug("Activated user: {}", user);
                return user;
            });
    }

    public Optional<User> completePasswordReset(String newPassword, String key) {
        log.debug("Reset user password for reset key {}", key);
        return userRepository.findOneByResetKey(key)
            .filter(user -> user.getResetDate().isAfter(Instant.now().minusSeconds(86400)))
            .map(user -> {
                user.setPassword(passwordEncoder.encode(newPassword));
                user.setResetKey(null);
                user.setResetDate(null);
                userRepository.save(user);
                return user;
            });
    }

    public Optional<User> requestPasswordReset(String mail) {
        return userRepository.findOneByLogin(mail)
            .filter(User::getActivated)
            .map(user -> {
                user.setResetKey(RandomUtil.generateResetKey());
                user.setResetDate(Instant.now());
                userRepository.save(user);
                return user;
            });
    }

    public User registerUser(UserDTO userDTO, String password) {
        userRepository.findOneByLogin(userDTO.getLogin().toLowerCase()).ifPresent(existingUser -> {
            boolean removed = removeNonActivatedUser(existingUser);
            if (!removed) {
                throw new LoginAlreadyUsedException();
            }
        });
        userRepository.findByUserId(userDTO.getUserId()).ifPresent(existingUser -> {
            boolean removed = removeNonActivatedUser(existingUser);
            if (!removed) {
                throw new UserIdentifierAlreadyUsed();
            }
        });

        User newUser = new User();
        String encryptedPassword = passwordEncoder.encode(password);
        newUser.setLogin(userDTO.getLogin().toLowerCase());
        // new user gets initially a generated password
        newUser.setPassword(encryptedPassword);
        newUser.setFirstName(userDTO.getFirstName());
        newUser.setLastName(userDTO.getLastName());
        newUser.setImageUrl(userDTO.getImageUrl());
        newUser.setUserId(userDTO.getUserId());
        newUser.setDisplayPhone(userDTO.isDisplayPhone());
        newUser.setUserType(userDTO.getUserType());
        newUser.setLangKey("es_CR");
        newUser.setPhone(userDTO.getPhone());
        // new user is not active
        newUser.setActivated(false);
        // new user gets registration key
        newUser.setActivationKey(RandomUtil.generateActivationKey());
        Set<Authority> authorities = new HashSet<>();
        authorityRepository.findById(AuthoritiesConstants.USER).ifPresent(authorities::add);
        newUser.setAuthorities(authorities);
        newUser.setImage(getDefaultProfileImage());
        userRepository.save(newUser);
        log.debug("Created Information for User: {}", newUser);
        return newUser;
    }

    private boolean removeNonActivatedUser(User existingUser){
        if (existingUser.getActivated()) {
             return false;
        }
        userRepository.delete(existingUser);
        return true;
    }

    public User createUser(UserDTO userDTO) {
        User user = new User();
        user.setLogin(userDTO.getLogin().toLowerCase());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setImageUrl(userDTO.getImageUrl());
        if (userDTO.getLangKey() == null) {
            user.setLangKey(Constants.DEFAULT_LANGUAGE); // default language
        } else {
            user.setLangKey(userDTO.getLangKey());
        }
        String encryptedPassword = passwordEncoder.encode(RandomUtil.generatePassword());
        user.setPassword(encryptedPassword);
        user.setResetKey(RandomUtil.generateResetKey());
        user.setResetDate(Instant.now());
        user.setActivated(true);
        if (userDTO.getAuthorities() != null) {
            Set<Authority> authorities = userDTO.getAuthorities().stream()
                .map(authorityRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet());
            user.setAuthorities(authorities);
        }
        userRepository.save(user);
        log.debug("Created Information for User: {}", user);
        return user;
    }

    /**
     * Update basic information (first name, last name, email, language) for the current user.
     *
     *
     */
    public void updateMongoUser(UserDTO userToUpdate) {
        SecurityUtils.getCurrentUserLogin()
            .flatMap(userRepository::findOneByLogin)
            .ifPresent(user -> {
                user.setUserId(userToUpdate.getUserId());
                user.setFirstName(userToUpdate.getFirstName());
                user.setLastName(userToUpdate.getLastName());
                user.setLangKey(userToUpdate.getLangKey());
                //user.setImageUrl(imageUrl);
                user.setDisplayPhone(userToUpdate.isDisplayPhone());
                user.setPhone(userToUpdate.getPhone());
                user.setUserType(userToUpdate.getUserType());
                user.setImage(getUserImage(user.getImage(), userToUpdate.getImage()));
                userRepository.save(user);
                log.debug("Changed Information for User: {}", user);
            });
    }

    private Image getUserImage(Image oldImage, Image newImage){
        try {

            if(oldImage == null)
                oldImage = new Image();

            if (oldImage.getSource().equalsIgnoreCase(newImage.getSource()))
                return oldImage;

            Cloudinary cloudinaryUploader = CloudinaryUtil.getCloudinaryInstance();

            if(oldImage.getImageId() != null && !oldImage.getImageId().equalsIgnoreCase("0") && !oldImage.getImageId().isEmpty())
                cloudinaryUploader.uploader().destroy(oldImage.getImageId(), ObjectUtils.emptyMap());

            Map uploadResult = cloudinaryUploader.uploader().upload(newImage.getSource(), ObjectUtils.emptyMap());
            oldImage.setImageId(uploadResult.get("public_id").toString());
            oldImage.setSource(uploadResult.get("url").toString());


        }catch (Exception e){
            oldImage = getDefaultProfileImage();
        }
        return oldImage;
    }

    private Image getDefaultProfileImage(){
        Image defaultImage = new Image();
        defaultImage.setSource("http://res.cloudinary.com/ucenfotec19/image/upload/v1553423246/i8zar8csi8ygnvkap7cs.png");
        defaultImage.setImageId("0");
        defaultImage.setIsPrimary(true);
        return defaultImage;
    }

    /**
     * Update all information for a specific user, and return the modified user.
     *
     * @param userDTO user to update
     * @return updated user
     */
    public Optional<UserDTO> updateUser(UserDTO userDTO) {
        return Optional.of(userRepository
            .findById(userDTO.getId()))
            .filter(Optional::isPresent)
            .map(Optional::get)
            .map(user -> {
                user.setLogin(userDTO.getLogin().toLowerCase());
                user.setFirstName(userDTO.getFirstName());
                user.setLastName(userDTO.getLastName());
                user.setImageUrl(userDTO.getImageUrl());
                user.setActivated(userDTO.isActivated());
                user.setLangKey(userDTO.getLangKey());
                Set<Authority> managedAuthorities = user.getAuthorities();
                managedAuthorities.clear();
                userDTO.getAuthorities().stream()
                    .map(authorityRepository::findById)
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .forEach(managedAuthorities::add);
                userRepository.save(user);
                log.debug("Changed Information for User: {}", user);
                return user;
            })
            .map(UserDTO::new);
    }

    public void deleteUser(String login) {
        userRepository.findOneByLogin(login).ifPresent(user -> {
            userRepository.delete(user);
            log.debug("Deleted User: {}", user);
        });
    }

    public void changePassword(String currentClearTextPassword, String newPassword) {
        SecurityUtils.getCurrentUserLogin()
            .flatMap(userRepository::findOneByLogin)
            .ifPresent(user -> {
                String currentEncryptedPassword = user.getPassword();
                if (!passwordEncoder.matches(currentClearTextPassword, currentEncryptedPassword)) {
                    throw new InvalidPasswordException();
                }
                String encryptedPassword = passwordEncoder.encode(newPassword);
                user.setPassword(encryptedPassword);
                userRepository.save(user);
                log.debug("Changed password for User: {}", user);
            });
    }

    public Page<UserDTO> getAllManagedUsers(Pageable pageable) {
        return userRepository.findAllByLoginNot(pageable, Constants.ANONYMOUS_USER).map(UserDTO::new);
    }

    public Optional<User> getUserWithAuthoritiesByLogin(String login) {
        return userRepository.findOneByLogin(login);
    }

    public Optional<User> getUserWithAuthorities(String id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserWithAuthorities() {
        return SecurityUtils.getCurrentUserLogin().flatMap(userRepository::findOneByLogin);
    }

    /**
     * Not activated users should be automatically deleted after 3 days.
     * <p>
     * This is scheduled to get fired everyday, at 01:00 (am).
     */
    @Scheduled(cron = "0 0 1 * * ?")
    public void removeNotActivatedUsers() {
        userRepository
            .findAllByActivatedIsFalseAndCreatedDateBefore(Instant.now().minus(3, ChronoUnit.DAYS))
            .forEach(user -> {
                log.debug("Deleting not activated user {}", user.getLogin());
                userRepository.delete(user);
            });
    }

    /**
     * @return a list of all the authorities
     */
    public List<String> getAuthorities() {
        return authorityRepository.findAll().stream().map(Authority::getName).collect(Collectors.toList());
    }

    public User sendEmailToOwner(RealState tempRS) throws Exception{

        User user = new User();
        user.setFirstName("F U ANONYMOUS");

        Optional<String> login = SecurityUtils.getCurrentUserLogin();

        if (login.isPresent()) {

            Optional<User> client = userRepository.findOneByLogin(login.get());

            if (client.isPresent()) {
                if (!client.get().getId().equals(tempRS.getOwner().getId())) {
                    mailService.sendEmailToOwner(client.get(), tempRS);
                }

                return client.get();

            } else {
                throw new Exception("El Usuario solicitado no existe");
            }
        } else {
            throw new Exception("El Login solicitado no existe");
        }
    }

    public List<User> getUsersBasedOnFavorites(String realStateId) throws Exception {
        Optional<RealState> realStateOptional = realStateRepository.findById(realStateId);
        Query<RealState> realStateQuery =  datastore.createQuery(RealState.class);
        realStateQuery.criteria("id").equal(new ObjectId(realStateId));

        if(!realStateOptional.isPresent())
            throw new Exception("The element searched with id: "+ realStateId + " was not found");

        RealState realState = realStateOptional.get();

        Query<User> userQuery = datastore.createQuery(User.class);

        userQuery.criteria("favorites").in(realStateQuery.asKeyList());



        return userQuery.asList();
    }
}
