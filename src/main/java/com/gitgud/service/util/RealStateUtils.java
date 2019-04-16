package com.gitgud.service.util;

import com.gitgud.api.objects.ApiImage;
import com.gitgud.api.objects.ApiRealState;
import com.gitgud.api.objects.ApiUser;
import com.gitgud.domain.RealState;

public class RealStateUtils {
    public static ApiRealState toApiRealState(RealState realState) {
        ApiRealState result = new ApiRealState();
        ApiUser user = new ApiUser();
        ApiImage image = new ApiImage();
        ApiImage realStateImage = new ApiImage();

        result.setId(realState.getId());
        result.setAddr(realState.getProvince() + ", " + realState.getCity() + ", " + realState.getDistrict());
        result.setBaths(realState.getBaths());
        result.setBeds(realState.getRooms());
        result.setPrice(realState.getPrice());
        result.setSize(realState.getSize());
        result.setGar(realState.getGarage());
        result.setTitle(realState.getTitle());
        result.setType(realState.getRealStateType());

        user.setName(realState.getOwner().getFirstName() + " " + realState.getOwner().getLastName());
        user.setStars(realState.getOwner().getRaiting());
        if (realState.getOwner().getImage() != null) {
            image.setSource(realState.getOwner().getImage().getSource());
        }
        user.setImage(image);
        result.setUser(user);

        realState.getImages().forEach(i -> {
            if (i.isPrimary()) {
                realStateImage.setSource(i.getSource());
                realStateImage.setPrimary(i.isPrimary());
                realStateImage.setIs360Image(i.isIs360Image());
            }
            result.setImage(realStateImage);
        });

        return result;
    }
}
