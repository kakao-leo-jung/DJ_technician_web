package com.devjk.djtechnician.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class StatusController {

    @RequestMapping("/")
    @ResponseBody
    public String getAdminMain() {
        String ret = "<h1>Hello, DJ_Technician Socket Server is Running..<h1>";
        return ret;
    }

}
