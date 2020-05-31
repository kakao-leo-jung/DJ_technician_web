package com.djtechnician.web_socket_server.sampleTest;

public class Greeting {
  
  private String content;

  /* constructor */
  public Greeting(){

  }

  public Greeting(String content){
    this.content = content;
  }

  public String getContent(){
    return this.content;
  }

}