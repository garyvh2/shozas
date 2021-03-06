package com.gitgud.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.morphia.annotations.Embedded;
import dev.morphia.annotations.Entity;
import dev.morphia.annotations.Property;
import dev.morphia.annotations.Reference;
import org.apache.commons.lang3.StringUtils;
import javax.validation.constraints.Email;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Locale;
import java.util.Objects;
import java.util.Set;
import java.time.Instant;

/**
 * A user.
 */

@org.springframework.data.mongodb.core.mapping.Document(collection = "jhi_user")
@Entity("jhi_user")
public class User extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @dev.morphia.annotations.Id
    private String id;

    @NotNull
    @Email
    @Size(min = 1, max = 50)
    @Indexed
    private String login;

    @JsonIgnore
    @NotNull
    @Size(min = 60, max = 60)
    private String password;

    @Size(max = 50)
    @Field("first_name")
    @Property("first_name")
    private String firstName;

    @Size(max = 50)
    @Field("last_name")
    @Property("last_name")
    private String lastName;


    private boolean activated = false;

    @Size(min = 2, max = 6)
    @Field("lang_key")
    private String langKey;

    @Size(max = 256)
    @Field("image_url")
    @Property("image_url")
    private String imageUrl;

    @Size(max = 20)
    @Field("activation_key")
    @JsonIgnore
    private String activationKey;

    @Size(max = 20)
    @Field("reset_key")
    @JsonIgnore
    private String resetKey;

    @Field("reset_date")
    private Instant resetDate = null;

    @JsonIgnore
    private Set<Authority> authorities = new HashSet<>();

    private double raiting;

    private int phone;

    @DBRef
    @Field
    @Reference
    private HashSet<Review> reviews = new HashSet<Review>();

    @DBRef
    @Field
    @Reference(lazy = true)
    private HashSet<RealState> favorites = new HashSet<RealState>();

    @Field
    @Embedded
    private Image image;

    ///User Identifier, Cédula Fisica o juridica
    private String userId;

    private String userType;

    private boolean displayPhone;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    // Lowercase the login before saving it in database
    public void setLogin(String login) {
        this.login = StringUtils.lowerCase(login, Locale.ENGLISH);
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean getActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public String getActivationKey() {
        return activationKey;
    }

    public void setActivationKey(String activationKey) {
        this.activationKey = activationKey;
    }

    public String getResetKey() {
        return resetKey;
    }

    public void setResetKey(String resetKey) {
        this.resetKey = resetKey;
    }

    public Instant getResetDate() {
        return resetDate;
    }

    public void setResetDate(Instant resetDate) {
        this.resetDate = resetDate;
    }

    public String getLangKey() {
        return langKey;
    }

    public void setLangKey(String langKey) {
        this.langKey = langKey;
    }

    public Set<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }

    public double getRaiting() {
        return raiting;
    }

    public void setRaiting(double raiting) {
        this.raiting = raiting;
    }

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public HashSet<Review> getReviews() {
        return reviews;
    }

    public void setReviews(HashSet<Review> reviews) {
        this.reviews = reviews;
    }

    @JsonIgnore
    public HashSet<RealState> getFavorites() {
        return favorites;
    }

    public void setFavorites(HashSet<RealState> favorites) {
        this.favorites = favorites;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public boolean isDisplayPhone() {
        return displayPhone;
    }

    public void setDisplayPhone(boolean displayPhone) {
        this.displayPhone = displayPhone;
    }

    public void addFavorite(RealState realStateId) { this.favorites.add(realStateId); }
    public void removeFavorite(RealState realStateId) { this.favorites.remove(realStateId); }

    public HashSet<Review> getParserReviews(){
        HashSet<Review> result = new HashSet<>();

        if(this.reviews !=null) {
            this.reviews.forEach(review -> {
                review.getUserShopper().setReviews(null);
                review.getUserShopper().setFavorites(null);
                review.getRealState().getOwner().setFavorites(null);
                review.getRealState().getOwner().setReviews(null);
                result.add(review);
            });
        }
        return result;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        User user = (User) o;
        return !(user.getId() == null || getId() == null) && Objects.equals(getId(), user.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "User{" +
            "login='" + login + '\'' +
            ", firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            ", imageUrl='" + imageUrl + '\'' +
            ", activated='" + activated + '\'' +
            ", langKey='" + langKey + '\'' +
            ", activationKey='" + activationKey + '\'' +
            "}";
    }
}
