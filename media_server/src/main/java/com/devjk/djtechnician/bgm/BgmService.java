package com.devjk.djtechnician.bgm;

import com.devjk.djtechnician.bgm.dto.BgmInfo;
import com.devjk.djtechnician.bgm.dto.BgmList;
import com.google.api.gax.paging.Page;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BgmService {

  private static final Logger LOGGER = LoggerFactory.getLogger(BgmService.class);

  @Value("${projectId}")
  private String projectId;
  @Value("${bgmDirectory}")
  private String bgmDirectory;
  @Value("${bucketName}")
  private String bucketName;

  public BgmList getBgmListFromGCS(){

    LOGGER.debug("[■■■■■■■■■■■][BgmService][getBgmListFromGCS][START] : SEARCHING STORAGE BUCKET");

    Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
    Bucket bucket = storage.get(bucketName);
    Page<Blob> blobs = bucket.list(
            Storage.BlobListOption.prefix(bgmDirectory)
    );

    List<BgmInfo> list = new ArrayList<>();
    for(Blob blob : blobs.iterateAll()){
      String blobName = blob.getName();
      int blobLength = blobName.length();
      char lastCharacter = blobName.charAt(blobLength - 1);
      if(lastCharacter == '/'){
        continue;
      }
      int lastSlashIndex = blobName.lastIndexOf("/");
      BgmInfo bgmInfo = new BgmInfo(blobName.substring(0, lastSlashIndex + 1),
              blobName.substring(lastSlashIndex + 1, blobLength));
      list.add(bgmInfo);
    }

    BgmList bgmList = new BgmList();
    bgmList.setBgmInfoList(list);

    LOGGER.debug("[■■■■■■■■■■■][BgmService][getBgmListFromGCS][FINISH] : SEARCHING STORAGE BUCKET");

    return bgmList;
  }

}
