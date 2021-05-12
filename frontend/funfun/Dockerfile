# FROM node:lts-alpine
# # static 컨텐츠를 위한 http server를 설치한다.
# RUN npm install -g http-server
# # /app이라는 폴더를 만들고 이를 working directory로 지정한다.
# WORKDIR /app
# # package.json과 package-lock.json 파일을 복사한다.
# COPY package*.json ./
# # 필요한 패키지들을 설치한다.
# RUN npm install
# # 위에서 만든 working directory에 프로젝트 파일과 폴더들을 복사한다.
# COPY . .
# # 빌드를 실행한다.
# RUN npm run build
# # 3000 포트로 돌아가게끔 한다.
# EXPOSE 3000
# CMD [ "http-server", "-p 3000", "dist" ]

FROM node:12

MAINTAINER Lucas Shin <h971114@lieklion.org>

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
 
#  FROM  node:lts-alpine

# # MAINTAINER Lucas Shin <h971114@lieklion.org>

#  RUN npm install -g http-server

#  WORKDIR /app

#  COPY package*.json ./

#  RUN npm install

# # RUN npm install -g pm2

# COPY . .

# #RUN npm run build

# EXPOSE 3000

# # CMD ["pm2-runtime", "start", "./bin/www"]
# CMD ["http-server", "-p 3000", "dist" ]
# FROM node:alpine as builder

# WORKDIR /usr/src/app

# COPY package.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# FROM nginx

# COPY --from=builder /usr/src/app/build /usr/share/nginx/html
# FROM node:lts-alpine as builder

# # 작업 폴더를 만들고 npm 설치
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app
# ENV PATH /usr/src/app/node_modules/.bin:$PATH
# COPY package.json /usr/src/app/package.json
# RUN npm install --silent
# RUN npm install react-scripts@2.1.3 -g --silent

# # 소스를 작업폴더로 복사하고 빌드
# COPY . /usr/src/app
# RUN npm run build



# FROM nginx:1.13.9-alpine
# # # nginx의 기본 설정을 삭제하고 앱에서 설정한 파일을 복사
# # RUN rm -rf /etc/nginx/conf.d
# # COPY conf /etc/nginx

# # 위에서 생성한 앱의 빌드산출물을 nginx의 샘플 앱이 사용하던 폴더로 이동
# COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# # 80포트 오픈하고 nginx 실행
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]