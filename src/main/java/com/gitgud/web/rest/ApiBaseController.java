package com.gitgud.web.rest;

import com.gitgud.api.objects.ApiResultModel;
import org.apache.commons.lang3.time.StopWatch;

import java.util.concurrent.Callable;

public class ApiBaseController {

    private StopWatch timer = new StopWatch();

    public <T> ApiResultModel<T> GetApiResultModel (Callable<T> func ) throws Exception {
        ApiResultModel<T> result = new ApiResultModel<T>();
        boolean error = false;
        Exception exception = null;


        try {
            result.setResult(func.call());
            result.setStatus("Ok");
        }
        catch (Exception e){
            error = true;
            result.setStatus("Fail");
            result.setException(e);
            exception = e;
            result.setMessage(e.getMessage());
        }
        finally {

        }

        if (error)
            throw exception;

        return result;
    }

}
