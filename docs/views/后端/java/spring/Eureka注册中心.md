---
title: Eureka注册中心
date: 2019-08-01
sidebar: auto
tags: 
 - 微服务
categories:
 - 后端
---

::: tip Sping Cloud 微服务
本文主要介绍springCloud 注册中心eureka的使用
微服务是每个java后端必须的技术
:::
<!-- more -->

## 搭建Eureka注册中心
> 这里我们以创建并运行Eureka注册中心来看看在IDEA中创建并运行SpringCloud应用的正确姿势。

### 使用IDEA来创建SpringCloud应用
- 创建一个eureka-server模块，并使用Spring Initializer初始化一个SpringBoot项目

- 选择你需要的SpringCloud组件进行创建
![](https://user-gold-cdn.xitu.io/2019/9/11/16d1fe277f7412c1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- 创建完成后会发现pom.xml文件中已经有了eureka-server的依赖
``` xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
```

- 在启动类上添加@EnableEurekaServer注解来启用Euerka注册中心功能
``` java
@EnableEurekaServer
@SpringBootApplication
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}
```
- 在配置文件application.yml中添加Eureka注册中心的配置
``` yaml
server:
  port: 8001 #指定运行端口
spring:
  application:
    name: eureka-server #指定服务名称
eureka:
  instance:
    hostname: localhost #指定主机地址
  client:
    fetch-registry: false #指定是否要从注册中心获取服务（注册中心不需要开启）
    register-with-eureka: false #指定是否要注册到注册中心（注册中心不需要开启）
  server:
    enable-self-preservation: false #关闭保护模式
```

- 运行完成后访问地址http://localhost:8001/可以看到Eureka注册中心的界面

## 搭建Eureka客户端
- 新建一个eureka-client模块，并在pom.xml中添加如下依赖
``` xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```
- 在启动类上添加@EnableDiscoveryClient注解表明是一个Eureka客户端
``` java
@EnableDiscoveryClient
@SpringBootApplication
public class EurekaClientApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaClientApplication.class, args);
    }
}
```
- 在配置文件application.yml中添加Eureka客户端的配置
``` yaml
server:
  port: 8101 #运行端口号
spring:
  application:
    name: eureka-client #服务名称
eureka:
  client:
    register-with-eureka: true #注册到Eureka的注册中心
    fetch-registry: true #获取注册实例列表
    service-url:
      defaultZone: http://localhost:8001/eureka/ #配置注册中心地址
```
- 运行eureka-client

![](https://freely1005.github.io/images/cloud/eureka.png)

- 查看注册中心http://localhost:8001/发现Eureka客户端已经成功注册


![](https://freely1005.github.io/images/cloud/eureka-client.png)

### 搭建Eureka注册中心集群

### 搭建两个注册中心
>由于所有服务都会注册到注册中心去，服务之间的调用都是通过从注册中心获取的服务列表来调用，
>注册中心一旦宕机，所有服务调用都会出现问题。所以我们需要多个注册中心组成集群来提供服务，
>下面将搭建一个双节点的注册中心集群。

- 给eureka-sever添加配置文件application-replica1.yml配置第一个注册中心
``` yaml
server:
  port: 8002
spring:
  application:
    name: eureka-server
eureka:
  instance:
    hostname: replica1
  client:
    serviceUrl:
      defaultZone: http://replica2:8003/eureka/ #注册到另一个Eureka注册中心
    fetch-registry: true
    register-with-eureka: true
```

- 给eureka-sever添加配置文件application-replica2.yml配置第一个注册中心
``` yaml
server:
  port: 8003
spring:
  application:
    name: eureka-server
eureka:
  instance:
    hostname: replica2
  client:
    serviceUrl:
      defaultZone: http://replica1:8002/eureka/ #注册到另一个Eureka注册中心
    fetch-registry: true
    register-with-eureka: true
```
- 这里我们通过两个注册中心互相注册，搭建了注册中心的双节点集群，由于defaultZone使用了域名，所以还需在本机的host文件中配置一下。
   
- 修改本地host文件
> 127.0.0.1 replica1
> 
>127.0.0.1 replica2

### 运行Eureka注册中心集群
>在IDEA中我们可以通过使用不同的配置文件来启动同一个SpringBoot应用。

- 添加两个配置，分别以application-replica1.yml和application-replica2.yml来启动eureka-server
> 从原启动配置中复制一个出来

- 启动两个eureka-server，访问其中一个注册中心http://replica1:8002/发现另一个已经成为其备份

- 修改Eureka-client，让其连接到集群
> 添加eureka-client的配置文件application-replica.yml，让其同时注册到两个注册中心。
``` yaml
server:
  port: 8102
spring:
  application:
    name: eureka-client
eureka:
  client:
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://replica1:8002/eureka/,http://replica2:8003/eureka/ #同时注册到两个注册中心
```
> 以该配置文件启动后访问任意一个注册中心节点都可以看到eureka-client

## 给Eureka注册中心添加认证
### 创建一个eureka-security-server模块，在pom.xml中添加以下依赖
> 需要添加SpringSecurity模块。
``` xml
<dependency>
     <groupId>org.springframework.cloud</groupId>
     <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
 </dependency>
 
 <dependency>
     <groupId>org.springframework.boot</groupId>
     <artifactId>spring-boot-starter-security</artifactId>
 </dependency>
```
### 添加application.yml配置文件
> 主要是配置了登录注册中心的用户名和密码。
``` yaml
server:
   port: 8004
 spring:
   application:
     name: eureka-security-server
   security: #配置SpringSecurity登录用户名和密码
     user:
       name: freely
       password: 123456
 eureka:
   instance:
     hostname: localhost
   client:
     fetch-registry: false
     register-with-eureka: false
```

### 添加Java配置WebSecurityConfig
> 默认情况下添加SpringSecurity依赖的应用每个请求都需要添加CSRF token才能访问，
> Eureka客户端注册时并不会添加，所以需要配置/eureka/**路径不需要CSRF token。
``` java
@EnableWebSecurity
 public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
 
     @Override
     protected void configure(HttpSecurity http) throws Exception {
         http.csrf().ignoringAntMatchers("/eureka/**");
         super.configure(http);
     }
 }
```

### 运行eureka-security-server，访问http://localhost:8004发现需要登录认证
![](https://user-gold-cdn.xitu.io/2019/9/11/16d1fe27deed7671?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### eureka-client注册到有登录认证的注册中心

- 配置文件中需要修改注册中心地址格式
>http://${username}:${password}@${hostname}:${port}/eureka/

- 添加application-security.yml配置文件，按格式修改用户名和密码
``` yaml
server:
  port: 8103
spring:
  application:
    name: eureka-client
eureka:
  client:
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://freely:123456@localhost:8004/eureka/
```
- 以application-security.yml配置运行eureka-client，可以在注册中心界面看到eureka-client已经成功注册

## Eureka的常用配置
``` yaml
eureka:
  client: #eureka客户端配置
    register-with-eureka: true #是否将自己注册到eureka服务端上去
    fetch-registry: true #是否获取eureka服务端上注册的服务列表
    service-url:
      defaultZone: http://localhost:8001/eureka/ # 指定注册中心地址
    enabled: true # 启用eureka客户端
    registry-fetch-interval-seconds: 30 #定义去eureka服务端获取服务列表的时间间隔
  instance: #eureka客户端实例配置
    lease-renewal-interval-in-seconds: 30 #定义服务多久去注册中心续约
    lease-expiration-duration-in-seconds: 90 #定义服务多久不去续约认为服务失效
    metadata-map:
      zone: jiangsu #所在区域
    hostname: localhost #服务主机名称
    prefer-ip-address: false #是否优先使用ip来作为主机名
  server: #eureka服务端配置
    enable-self-preservation: false #关闭eureka服务端的保护机制
```

## 项目源码地址
[https://github.com/freely1005.....](https://github.com/freely1005/cs-cloud.git)