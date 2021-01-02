package com.devjk.djtechnician.message.sample.controller;

import com.devjk.djtechnician.message.sample.dao.HelloMessage;
import com.devjk.djtechnician.message.sample.service.GreetingService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public GreetingService greeting(HelloMessage helloMessage) {
        try{
            Thread.sleep(3000);
        }catch(Exception e) {

        }
        return new GreetingService("Hello, " + HtmlUtils.htmlEscape(helloMessage.getName()));
    }

}
