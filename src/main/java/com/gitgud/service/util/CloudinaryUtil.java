package com.gitgud.service.util;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

public class CloudinaryUtil {

    private static Cloudinary cloudinary;

    public static Cloudinary getCloudinaryInstance() {
        if(cloudinary == null) {
            cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "ucenfotec19",
                "api_key", "496576433731125",
                "api_secret", "iZJRYDUeI235fGacdBKK35MX9Nw"));
            return cloudinary;
        }
        return cloudinary;
    }
}
