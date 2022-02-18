import classes from './MealsSummary.module.css';

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>맛있는 음식을 배달 시켜보세요</h2>
      <p>
        제공되는 다양한 식사 중에서 가장 좋아하는 식사를 선택하세요. 집에서
        맛있는 점심 또는 저녁 식사를 즐기십시오.
      </p>
      <p>우리의 모든 식사는 고품질의 재료로 빠르게 조리됩니다.</p>
    </section>
  );
};

export default MealsSummary;
