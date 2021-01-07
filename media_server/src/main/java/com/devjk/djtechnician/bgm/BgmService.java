package com.devjk.djtechnician.bgm;

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
import java.util.List;

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

    List<String> list = new ArrayList<>();
    for(Blob blob : blobs.iterateAll()){
      list.add(blob.getName());
    }

    BgmList bgmList = new BgmList();
    bgmList.setTitles(list);

    LOGGER.debug("[■■■■■■■■■■■][BgmService][getBgmListFromGCS][FINISH] : SEARCHING STORAGE BUCKET");

    return bgmList;
  }

}
