package com.gitgud.service.util;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

public class CloudinaryUtil {
    public static Cloudinary getCloudinaryInstance() {
        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
            "cloud_name", "ucenfotec19",
            "api_key", "496576433731125",
            "api_secret", "iZJRYDUeI235fGacdBKK35MX9Nw"));
        return cloudinary;
    }
}
