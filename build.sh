#!/bin/sh

# 상위 디렉토리로 이동
cd ../

# output 디렉토리 생성
mkdir -p output

# CapstoneLocalLens의 파일을 output 디렉토리로 복사
cp -R ./CapstoneLocalLens/* ./output/

# output 디렉토리를 다시 CapstoneLocalLens로 복사하는 부분을 수정
cp -R ./output ./CapstoneLocalLens/
