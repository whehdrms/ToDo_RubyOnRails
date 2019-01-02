ToDo list App (Ruby on Rails)
===
### 서비스 링크
(서비스 중단)

환경
---
### Server
- AWS EC2 Amazon Linux 2 (t2.micro)
  - Nginx / Passenger

### BackEnd
- Ruby on Rails
  - Ruby 2.3.4p301 (2017-03-30 revision 58214) [x86_64-linux]
  - Rails 4.2.5
  - SQLite3
### FrontEnd
- HTML5 / SCSS
- javascript / jQuery / jQuery-ui
- Bootstrap 4.2
- fontawesome 4.7.0

설치/빌드 방법 (linux 기준)
---
### git 설치
```
$ sudo yum update
$ sudo yum search git
$ sudo yum install git-all.noarch
```

### Ruby 설치 (rvm을 활용 https://rvm.io)
```
$ gpg2 --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
$ \curl -sSL https://get.rvm.io | bash -s stable
$ rvm install ruby 2.3.4
```

### bundler 설치
```
$ gem install bundle
```

### Node 설치 (관리자 권한)
```
$ sudo su
$ wget http://nodejs.org/dist/v4.6.1/node-v4.6.1-linux-x64.tar.gz
$ tar zxvf node-v4.6.1-linux-x64.tar.gz
$ cd ./node-v4.6.1-linux-x64
$ cp -rf ./* /usr
$ source ~/.bash_profile
$ node -v
```

### rails 설치
```
$ gem install rails --version 4.2.5
```

### passenger 설치
```
$ gem install passenger
```

### Nginx 설치
```
$ sudo chmod o+x "/home/ec2-user"
$ sudo yum install libcurl-devel.x86_64
$ sudo dd if=/dev/zero of=/swap bs=1M count=1024
$ sudo mkswap /swap
$ sudo swapon /swap
$ passenger-install-nginx-module
```

### Nginx 설정
`/etc/nginx/nginx.conf` 수정
```
#gzip on;
// 하단 내용 추가
server {
  listen 80;
  passenger_enabled on;
  root /var/www/ToDo_RubyOnRails/public; //프로젝트 명으로 변경
}
```

### 프로젝트 clone 및 secret key 복사
```
$ git clone https://github.com/whehdrms/ToDo_RubyOnRails.git
$ ls ToDo_RubyOnRails
$ RAILS_ENV=production rake secret //시크릿 키 복사
```

###  secret_key 적용
`secrets.yml` 수정
```
production:
  secret_key_base: //여기에 복사한 시크릿 키 붙여넣기
```

### gem설치/asset precompile/db migrate 및 서버 시작
```
$ bundle install
$ RAILS_ENV=production rake assets:precompile
$ rake db:migrate RAILS_ENV=production
$ sudo /opt/nginx/sbin/nginx
```

기본 기능
---
- 새로운 TODO(제목 + 내용)를 작성한다. (o)
  - modal을 활용하여 페이지 이동 없이 새로운 TODO 작성 가능
- 사용자의 선택에 의해 TODO에는 마감 기한을 넣을 수 있다. (o)
  - 버튼을 활용하여 날짜/시간 선택 활성화 가능(필수 입력 여부도 함께 변화)
  - jquery-ui 라이브러리를 활용한 편리한 날짜/시간 선택 가능
- 우선순위를 조절할 수 있다. (o)
  - 중요도를 표시할 수 있고 중요도순, 남은 날짜 순, 등록 순 정렬 가능
- 완료 처리를 할 수 있다. (o)
  - JQuery Ajax를 활용하여 비동기 완료 처리 및 css 효과 삽입
- 마감기한이 지난 TODO에 대해 알림을 노출한다. (o)
  - navbar에 알림창을 설정하여 modal을 통해 마감기한이 지난 TODO 조회 가능
  - facebook 등 SNS와 유사하게 몇개의 알림이 왔는지 붉은 원으로 숫자 표기 
- TODO 목록을 볼 수 있다. (o)
  - 완료 목록 tab을 따로 구성하여 별도 확인 가능
- TODO 내용을 수정할 수 있다. (o)
  - modal을 활용한 수정 기능
- TODO 항목을 삭제할 수 있다. (o)
  - 삭제 확인창도 추가

추가 기능
---
- 현재 시간 및 TODO까지 남은 시간 초단위 표기
- 별점 설정을 활용한 중요도 표기
- 상태(진행중/마감/완료)에 따른 TODO card 색 다양화
- 별도의 완료탭을 생성하여 완료 처리시 자동 분류
- Programmers 홈페이지와 유사한 CSS 추가(navbar, modal, tooltip 등)
- AWS EC2 Amazon Linux 서버에 배포 및 도메인(ilovegrepp.site)에 연결하여 직접 사용 가능
- HTTPS 통신 적용
- favicon 및 site discription 추가

Unit test 및 Integration test
---
### gem "minitest"을 활용한 Unit test (https://github.com/seattlerb/minitest)
![Unit test](https://s3.ap-northeast-2.amazonaws.com/grepp/UnitTest.PNG "Unit test")

### gem 'minitest-rails-capybara' Integration test (http://blowmage.com/minitest-rails-capybara/)
![Integration test](https://s3.ap-northeast-2.amazonaws.com/grepp/IntegrationTest.PNG "Integration test")

서비스 UI 설명
---
### UI 설명 및 스크린샷
![UI](https://s3.ap-northeast-2.amazonaws.com/grepp/greppUi.png "UI")
![UI2](https://s3.ap-northeast-2.amazonaws.com/grepp/greppUi2.png "UI2")
