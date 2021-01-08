package com.devjk.djtechnician.bgm;

import com.devjk.djtechnician.bgm.dto.BgmInfo;
import com.devjk.djtechnician.bgm.dto.BgmList;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

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

  @PostMapping(
          value = "",
          produces = MediaType.APPLICATION_OCTET_STREAM_VALUE
  )
  public byte[] getBgmFileFromGCS(@RequestBody BgmInfo bgmInfo){
    return bgmService.getBgmFileFromGCS(bgmInfo.getDirectory(), bgmInfo.getTitle());
  }

}
