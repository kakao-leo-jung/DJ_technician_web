package com.devjk.djtechnician.bgm;

import com.devjk.djtechnician.bgm.dto.BgmList;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bgm")
public class BgmController {

  private final BgmService bgmService;

  public BgmController(BgmService bgmService) {
    this.bgmService = bgmService;
  }

  @GetMapping("/list")
  public BgmList getBgmListFromGCS(){
    return bgmService.getBgmListFromGCS();
  }

}
