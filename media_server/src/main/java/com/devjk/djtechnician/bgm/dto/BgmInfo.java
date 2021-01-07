package com.devjk.djtechnician.bgm.dto;

public class BgmInfo {

  private String directory;
  private String title;

  public BgmInfo() {

  }

  public BgmInfo(String directory, String title){
    this.directory = directory;
    this.title = title;
  }

  public String getDirectory() {
    return directory;
  }

  public void setDirectory(String directory) {
    this.directory = directory;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }
}
