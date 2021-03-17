import Link from 'next/link';
import styles from '@/styles/Header.module.css';
import { firebase, useAuth } from '@/services/firebase';

export default function Header() {
  const { user } = useAuth();

  const login = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  const logout = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  return (
    <div className={styles.container}>
      <Link href="/">
        <svg width="518" height="139" viewBox="0 0 518 139" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M41.1875 9.98438H25.2266V54H16.4023V9.98438H0.582031V2.8125H41.1875V9.98438ZM55.5312 20.1094C58.3203 16.875 61.8477 15.2578 66.1133 15.2578C74.2227 15.2578 78.3359 19.8867 78.4531 29.1445V54H69.9102V29.4609C69.9102 26.8359 69.3359 24.9844 68.1875 23.9062C67.0625 22.8047 65.3984 22.2539 63.1953 22.2539C59.7734 22.2539 57.2188 23.7773 55.5312 26.8242V54H46.9883V0H55.5312V20.1094ZM103.871 54.7031C98.457 54.7031 94.0625 53.0039 90.6875 49.6055C87.3359 46.1836 85.6602 41.6367 85.6602 35.9648V34.9102C85.6602 31.1133 86.3867 27.7266 87.8398 24.75C89.3164 21.75 91.3789 19.418 94.0273 17.7539C96.6758 16.0898 99.6289 15.2578 102.887 15.2578C108.066 15.2578 112.062 16.9102 114.875 20.2148C117.711 23.5195 119.129 28.1953 119.129 34.2422V37.6875H94.2734C94.5312 40.8281 95.5742 43.3125 97.4023 45.1406C99.2539 46.9688 101.574 47.8828 104.363 47.8828C108.277 47.8828 111.465 46.3008 113.926 43.1367L118.531 47.5312C117.008 49.8047 114.969 51.5742 112.414 52.8398C109.883 54.082 107.035 54.7031 103.871 54.7031ZM102.852 22.1133C100.508 22.1133 98.6094 22.9336 97.1562 24.5742C95.7266 26.2148 94.8125 28.5 94.4141 31.4297H110.691V30.7969C110.504 27.9375 109.742 25.7812 108.406 24.3281C107.07 22.8516 105.219 22.1133 102.852 22.1133ZM44.8086 138H35.9141L13.0977 101.684V138H4.20312V86.8125H13.0977L35.9844 123.27V86.8125H44.8086V138ZM71.2461 138.703C65.832 138.703 61.4375 137.004 58.0625 133.605C54.7109 130.184 53.0352 125.637 53.0352 119.965V118.91C53.0352 115.113 53.7617 111.727 55.2148 108.75C56.6914 105.75 58.7539 103.418 61.4023 101.754C64.0508 100.09 67.0039 99.2578 70.2617 99.2578C75.4414 99.2578 79.4375 100.91 82.25 104.215C85.0859 107.52 86.5039 112.195 86.5039 118.242V121.688H61.6484C61.9062 124.828 62.9492 127.312 64.7773 129.141C66.6289 130.969 68.9492 131.883 71.7383 131.883C75.6523 131.883 78.8398 130.301 81.3008 127.137L85.9062 131.531C84.3828 133.805 82.3438 135.574 79.7891 136.84C77.2578 138.082 74.4102 138.703 71.2461 138.703ZM70.2266 106.113C67.8828 106.113 65.9844 106.934 64.5312 108.574C63.1016 110.215 62.1875 112.5 61.7891 115.43H78.0664V114.797C77.8789 111.938 77.1172 109.781 75.7812 108.328C74.4453 106.852 72.5938 106.113 70.2266 106.113ZM126.582 126.223L132.629 99.9609H140.961L130.59 138H123.559L115.402 111.879L107.387 138H100.355L89.9492 99.9609H98.2812L104.434 125.941L112.238 99.9609H118.672L126.582 126.223ZM180.125 115.887L174.324 122.039V138H165.43V86.8125H174.324V110.824L179.246 104.742L194.223 86.8125H204.98L185.961 109.488L206.07 138H195.523L180.125 115.887ZM219.113 138H210.57V99.9609H219.113V138ZM210.043 90.082C210.043 88.7695 210.453 87.6797 211.273 86.8125C212.117 85.9453 213.312 85.5117 214.859 85.5117C216.406 85.5117 217.602 85.9453 218.445 86.8125C219.289 87.6797 219.711 88.7695 219.711 90.082C219.711 91.3711 219.289 92.4492 218.445 93.3164C217.602 94.1602 216.406 94.582 214.859 94.582C213.312 94.582 212.117 94.1602 211.273 93.3164C210.453 92.4492 210.043 91.3711 210.043 90.082ZM226.848 118.699C226.848 112.84 228.207 108.141 230.926 104.602C233.645 101.039 237.289 99.2578 241.859 99.2578C245.891 99.2578 249.148 100.664 251.633 103.477V84H260.176V138H252.441L252.02 134.062C249.465 137.156 246.055 138.703 241.789 138.703C237.336 138.703 233.727 136.91 230.961 133.324C228.219 129.738 226.848 124.863 226.848 118.699ZM235.391 119.438C235.391 123.305 236.129 126.328 237.605 128.508C239.105 130.664 241.227 131.742 243.969 131.742C247.461 131.742 250.016 130.184 251.633 127.066V110.824C250.062 107.777 247.531 106.254 244.039 106.254C241.273 106.254 239.141 107.355 237.641 109.559C236.141 111.738 235.391 115.031 235.391 119.438ZM290.41 127.664C290.41 126.141 289.777 124.98 288.512 124.184C287.27 123.387 285.195 122.684 282.289 122.074C279.383 121.465 276.957 120.691 275.012 119.754C270.746 117.691 268.613 114.703 268.613 110.789C268.613 107.508 269.996 104.766 272.762 102.562C275.527 100.359 279.043 99.2578 283.309 99.2578C287.855 99.2578 291.523 100.383 294.312 102.633C297.125 104.883 298.531 107.801 298.531 111.387H289.988C289.988 109.746 289.379 108.387 288.16 107.309C286.941 106.207 285.324 105.656 283.309 105.656C281.434 105.656 279.898 106.09 278.703 106.957C277.531 107.824 276.945 108.984 276.945 110.438C276.945 111.75 277.496 112.77 278.598 113.496C279.699 114.223 281.926 114.961 285.277 115.711C288.629 116.438 291.254 117.316 293.152 118.348C295.074 119.355 296.492 120.574 297.406 122.004C298.344 123.434 298.812 125.168 298.812 127.207C298.812 130.629 297.395 133.406 294.559 135.539C291.723 137.648 288.008 138.703 283.414 138.703C280.297 138.703 277.52 138.141 275.082 137.016C272.645 135.891 270.746 134.344 269.387 132.375C268.027 130.406 267.348 128.285 267.348 126.012H275.645C275.762 128.027 276.523 129.586 277.93 130.688C279.336 131.766 281.199 132.305 283.52 132.305C285.77 132.305 287.48 131.883 288.652 131.039C289.824 130.172 290.41 129.047 290.41 127.664Z" fill="#0D0D46"/>
          <path d="M362.023 93.9844H346.062V138H337.238V93.9844H321.418V86.8125H362.023V93.9844ZM377.035 138H368.492V99.9609H377.035V138ZM367.965 90.082C367.965 88.7695 368.375 87.6797 369.195 86.8125C370.039 85.9453 371.234 85.5117 372.781 85.5117C374.328 85.5117 375.523 85.9453 376.367 86.8125C377.211 87.6797 377.633 88.7695 377.633 90.082C377.633 91.3711 377.211 92.4492 376.367 93.3164C375.523 94.1602 374.328 94.582 372.781 94.582C371.234 94.582 370.039 94.1602 369.195 93.3164C368.375 92.4492 367.965 91.3711 367.965 90.082ZM394.402 99.9609L394.648 103.934C397.32 100.816 400.977 99.2578 405.617 99.2578C410.703 99.2578 414.184 101.203 416.059 105.094C418.824 101.203 422.715 99.2578 427.73 99.2578C431.926 99.2578 435.043 100.418 437.082 102.738C439.145 105.059 440.199 108.48 440.246 113.004V138H431.703V113.25C431.703 110.836 431.176 109.066 430.121 107.941C429.066 106.816 427.32 106.254 424.883 106.254C422.938 106.254 421.344 106.781 420.102 107.836C418.883 108.867 418.027 110.227 417.535 111.914L417.57 138H409.027V112.969C408.91 108.492 406.625 106.254 402.172 106.254C398.75 106.254 396.324 107.648 394.895 110.438V138H386.352V99.9609H394.402ZM465.77 138.703C460.355 138.703 455.961 137.004 452.586 133.605C449.234 130.184 447.559 125.637 447.559 119.965V118.91C447.559 115.113 448.285 111.727 449.738 108.75C451.215 105.75 453.277 103.418 455.926 101.754C458.574 100.09 461.527 99.2578 464.785 99.2578C469.965 99.2578 473.961 100.91 476.773 104.215C479.609 107.52 481.027 112.195 481.027 118.242V121.688H456.172C456.43 124.828 457.473 127.312 459.301 129.141C461.152 130.969 463.473 131.883 466.262 131.883C470.176 131.883 473.363 130.301 475.824 127.137L480.43 131.531C478.906 133.805 476.867 135.574 474.312 136.84C471.781 138.082 468.934 138.703 465.77 138.703ZM464.75 106.113C462.406 106.113 460.508 106.934 459.055 108.574C457.625 110.215 456.711 112.5 456.312 115.43H472.59V114.797C472.402 111.938 471.641 109.781 470.305 108.328C468.969 106.852 467.117 106.113 464.75 106.113ZM509.012 127.664C509.012 126.141 508.379 124.98 507.113 124.184C505.871 123.387 503.797 122.684 500.891 122.074C497.984 121.465 495.559 120.691 493.613 119.754C489.348 117.691 487.215 114.703 487.215 110.789C487.215 107.508 488.598 104.766 491.363 102.562C494.129 100.359 497.645 99.2578 501.91 99.2578C506.457 99.2578 510.125 100.383 512.914 102.633C515.727 104.883 517.133 107.801 517.133 111.387H508.59C508.59 109.746 507.98 108.387 506.762 107.309C505.543 106.207 503.926 105.656 501.91 105.656C500.035 105.656 498.5 106.09 497.305 106.957C496.133 107.824 495.547 108.984 495.547 110.438C495.547 111.75 496.098 112.77 497.199 113.496C498.301 114.223 500.527 114.961 503.879 115.711C507.23 116.438 509.855 117.316 511.754 118.348C513.676 119.355 515.094 120.574 516.008 122.004C516.945 123.434 517.414 125.168 517.414 127.207C517.414 130.629 515.996 133.406 513.16 135.539C510.324 137.648 506.609 138.703 502.016 138.703C498.898 138.703 496.121 138.141 493.684 137.016C491.246 135.891 489.348 134.344 487.988 132.375C486.629 130.406 485.949 128.285 485.949 126.012H494.246C494.363 128.027 495.125 129.586 496.531 130.688C497.938 131.766 499.801 132.305 502.121 132.305C504.371 132.305 506.082 131.883 507.254 131.039C508.426 130.172 509.012 129.047 509.012 127.664Z" fill="#00ADB5"/>
        </svg>
      </Link>

      <div className={styles.links}>
        <Link href="/">Latest</Link>
        <Link href="/explore">Explore</Link>
        {!user && <a href="#" onClick={login}>Login</a>}
        {user && (
          <a href="#" data-tip={user.displayName} data-place="bottom" onClick={logout} className={styles.avatar}>
            <img src={user.photoURL} />
          </a>
        )}
      </div>
    </div>
  )
}
