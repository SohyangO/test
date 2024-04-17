'use client';

import styles from './page.module.css';
import { Image, Button, Link } from '@nextui-org/react';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const useragt = navigator.userAgent.toLowerCase();
    const target_url = location.href;

    if (useragt.match(/kakaotalk/i)) {
      //카카오톡 외부브라우저로 호출
      window.location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(target_url);
    } else if (useragt.match(/line/i)) {
      if (target_url.indexOf('?') !== -1) {
        window.location.href = target_url + '&openExternalBrowser=1';
      } else {
        window.location.href = target_url + '?openExternalBrowser=1';
      }
    }
    if (useragt.match(/iphone|ipad|ipod/i)) {
      // 아이폰은 강제로 사파리를 실행할 수 없다 ㅠㅠ
      // 모바일 대응 뷰포트 강제 설정
      const mobile = document.createElement('meta');
      mobile.name = 'viewport';
      mobile.content = 'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimal-ui';
      document.getElementsByTagName('head')[0].appendChild(mobile);
    } else {
      // 안드로이드는 Chrome이 설치되어있음으로 강제로 스킴 실행한다.
      window.location.href =
        'intent://' + target_url.replace(/https?:\/\//i, '') + '#Intent;scheme=http;package=com.android.chrome;end';
    }
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.image_background}>
          <div className={styles.background_color}>
            <div className={styles.copy_container}>
              <h1 className={styles.head_copy}>
                "그래서 우리,
                <br />
                언제 어디서 만나는 거야?"
              </h1>
              <span>
                <p className={styles.middle_copy}>
                  '우리 만나는 거 맞아?', '그럼 다음에 만나자' 등<br />
                  약속을 정하기 위해 고민을 거듭했던 경험 있지 않나요?
                </p>
                <p className={styles.middle_copy}>바쁜 일상 속, 우리들의 소중한 시간과 만남을 위해</p>
                <p className={styles.middle_copy}>
                  약속 시간과 장소를 고민하는 시간을 줄여줄 수 있는 <br /> 약속 확정 서비스, owl-link입니다
                </p>
              </span>
              <Button href="/start" as={Link} variant="flat" size="lg" className={styles.button}>
                모임 시작하기
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <h3>이런 경우에 쓰면 좋아요!</h3>
        <div className={styles.use_cases}>
          <span className={styles.use_case}>
            <Image src="images/manage_schedule.png" width={50} />
            <p>
              모임 일정 관리가
              <br />
              필요할 때
            </p>
          </span>
          <span className={styles.use_case}>
            <Image src="images/appointment.png" width={50} />
            <p>
              약속을 빠르게
              <br />
              정하고 싶을 때
            </p>
          </span>
          <span className={styles.use_case}>
            <Image src="images/spot.png" width={50} />
            <p>
              최적의 만남 장소를
              <br />
              찾고 싶을 때
            </p>
          </span>
          <span className={styles.use_case}>
            <Image src="images/my_schedule.png" width={50} />
            <p>
              모임 일정을
              <br />한 눈에 보고 싶을 때
            </p>
          </span>
        </div>
      </section>
    </main>
  );
}
