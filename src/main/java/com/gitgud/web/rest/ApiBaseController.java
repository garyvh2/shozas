package com.gitgud.web.rest;

import com.gitgud.domain.ApiResultModel;
import org.apache.commons.lang3.time.StopWatch;

import java.util.concurrent.Callable;

public class ApiBaseController {

    private StopWatch timer = new StopWatch();

    public <T> ApiResultModel<T> GetApiResultModel (Callable<T> func){
        ApiResultModel<T> result = new ApiResultModel<T>();
        timer.start();

        try {
            result.setResult(func.call());
            result.setStatus("Ok");
        }
        catch (Exception e){
            result.setStatus("Fail");

            result.setException(e);
        }
        finally {
            timer.stop();
            result.setTime(Long.toString(timer.getTime()));
            timer.reset();
        }

        return result;
    }

}
