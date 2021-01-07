package com.devjk.djtechnician.status;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class StatusController {

  @RequestMapping("/")
  @ResponseBody
  public String getDefaultServerPage() {
    return "<h1>Hello, DJ_Technician Media Server is Running..<h1>";
  }

}
