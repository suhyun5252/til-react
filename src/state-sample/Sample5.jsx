import { useState } from "react";

const Sample5 = () => {
  const [goodCount, setGoodCount] = useState(0);
  const [badCount, setBadCount] = useState(0);
  // 좋아요 버튼 만들고 숫자 증가
  const clickAdd = () => {
    if (badCount < 1) {
      setGoodCount(goodCount + 1);
    }
  };
  // 싫어요 버튼 만들고 숫자 감소
  const clickRemove = () => {
    if (goodCount < 1) {
      setBadCount(badCount - 1);
    }
  };

  return (
    <div>
      <div>
        <span>좋아요{goodCount}</span>
        <span>싫어요{badCount}</span>
      </div>
      <button onClick={clickAdd}>좋아요</button>
      <button onClick={clickRemove}>싫어요</button>
    </div>
  );
};

export default Sample5;
