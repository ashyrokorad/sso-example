This is a POC project for article [SSO with Nginx auth_request module](https://developers.shopware.com/blog/2015/03/02/sso-with-nginx-authrequest-module/). Appliction has following resources:

| Path                                        | Notes
|:--------------------------------------------|:-
| [`/app`](http://example.com:8080/app)       | Protected resource(application)
| [`/login`](http://example.com:8080/login)   | Login page
| [`/user`](http://example.com:8080/user)     | API to check whether user is logged in
| [`/logout`](http://example.com:8080/logout) | API to log out

# Setup 

Update your `/etc/hosts` files with following content:

```
127.0.0.1       example.com auth.example.com app.example.com
```

# Build & Run

```shell
make build # to build all docker images
make run   # to build and run
```

# Description

 Application consists from thre modules:

* **gate** - reverse proxy
* **auth** - auth. adapater for real auth. provider
* **app** - protected resource(application)

Here is sequence diagram:

![GitHub Logo](/doc/diagram.png)



# Resources

* [SSO with Nginx auth_request module](https://developers.shopware.com/blog/2015/03/02/sso-with-nginx-authrequest-module/)
* [nginx-auth-docker](https://github.com/roylines/nginx-auth-docker)
* [nginx-sso - Simple offline SSO for nginx](https://heipei.github.io/2015/09/23/nginx-sso-Simple-offline-SSO-for-nginx/)
* [AD FS Scenarios for Developers](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/overview/ad-fs-scenarios-for-developers)
