package com.djtechnician.web_socket_server.sampleTest;

public class HelloMessage {
  
  private String name;

  /* constructor */
  public HelloMessage() {

  }

  public HelloMessage(String name){
    this.name = name;
  }

  public String getName(){
    return this.name;
  }

  public void setName(String name){
    this.name = name;
  }

}