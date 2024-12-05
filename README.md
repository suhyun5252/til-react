# 리소스 최적화

## 1. 이미지

- 이미지, 폰트 등...
- /public 은 원본을 유지한다.
- /src 는 압축한다 (웹브라우저도 보관하고 있다.)
- 용도에 맞게 사용
- `/src` 보관하고 사용 권장

## 2. Font 파일

- font는 가능하면 웹폰트 URL을 사용하자
- `구글 폰트` 또는 `눈누`에 `웹폰트 URL` 이 없는 경우 직접 파일 설정
- `파일인 경우 public 폴더`에 넣어두고 활용
- /src/assets 에 두고 사용시 설정할 것이 많음
- https://noonnu.cc/font_page/pick
- https://fonts.google.com/
- 예 ) https://www.lotteriafont.com/chobddag

### 2.1 public/ 폴더에 파일 배치

- /src/index.css : 모든 기본적인 적용

```css
/* 글꼴 설정 */
@font-face {
  font-family: "chab";
  src: url("/chab.ttf");
}
@font-face {
  font-family: "ddag";
  src: url("/ddag.ttf");
}

body {
  font-family: "chab";
  font-size: var(--font-size-base);
  color: var(--primary-color);
}
```

# 빌드하기

- 배포 버전 생성 : `npm run build`
- 배포 버전 테스트 : `npm run preview`
