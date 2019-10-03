FROM node:latest

# install yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash

# install python tooling
RUN apt-get update -y && apt-get install -y python-dev python-pip && pip install --upgrade pip

# install other utils
RUN apt-get update -y && apt-get install -y screen

# install aws-cli
RUN pip install awscli

# install gcloud CLI
RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg  add - && apt-get update -y && apt-get install google-cloud-sdk -y

# RUN gcloud components install beta && gcloud components update
