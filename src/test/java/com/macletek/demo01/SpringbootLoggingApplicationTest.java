package com.macletek.demo01;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
public class SpringbootLoggingApplicationTest {
    Logger logger = LoggerFactory.getLogger(SpringbootLoggingApplicationTest.class);
    @Test
    public void logTest(){
        for (int i = 0; i <100;i++) {
            logger.info("info");
            logger.error("error");
            logger.debug("debug");
        }

    }
}
