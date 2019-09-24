const ua = navigator.userAgent;

export const isAndroid = () => /(?:Android)/.test(ua);
export const isTablet = () => /(?:iPad|PlayBook)/.test(ua) || (isAndroid() && !/(?:Mobile)/.test(ua));
export const isIos = () => /(?:iPhone)/.test(ua) && !isTablet();
export const isWechat = () => /MicroMessenger/.test(ua);
export const isPc = () => !isIos() && !isAndroid() && !isWechat();

export const setMobileTouch = () => {
  if (isPc()) {
    return;
  }
  // touch-action: manipulation; 启用平移和捏合缩放手势，但禁用其他非标准手势
  const nextCss = `
    * {
      -moz-user-select:none; -webkit-user-select:none; -ms-user-select:none; user-select:none; 
      touch-action: manipulation;
    }
    .can-user-select, input, textarea {
      -moz-user-select:auto; -webkit-user-select:auto;-ms-user-select:auto; user-select:auto;
    }
  `;

  const id = 'mobile-touch-style-';
  const lastStyle = document.getElementById(id);
  if (lastStyle) {
    lastStyle.textContent = nextCss;
  } else {
    const styleEle = document.createElement('style');
    styleEle.textContent = nextCss;
    styleEle.id = id;
    document.head.append(styleEle);
  }

  /** 阻止双指放大; */
  document.addEventListener('gesturestart', function(event) {
    event.preventDefault();
  });

  // 处理ios移动端键盘自动收起，并且回到页面滚动位置
  let bodyScrollTop = 0;
  let keyboardFocusInput: any;
  const bindBlurKeyboard = () => {
    if (keyboardFocusInput && keyboardFocusInput.blur) {
      keyboardFocusInput.blur();
    }
  };
  document.body.addEventListener('focusin', e => {
    //软键盘弹起事件
    // alert(1);
    keyboardFocusInput = e.target;
    bodyScrollTop = document.body.scrollTop;
    setTimeout(() => {
      document.body.addEventListener('touchend', bindBlurKeyboard);
    }, 50);
  });
  document.body.addEventListener('focusout', () => {
    //软键盘关闭事件
    // alert(2);
    document.body.scrollTop = bodyScrollTop;
    keyboardFocusInput = false;
    document.body.removeEventListener('touchend', bindBlurKeyboard);
  });

  // 阻止默认的处理方式(阻止下拉滑动的效果)
  document.addEventListener(
    'touchmove',
    function(e) {
      e.preventDefault();
    },
    { passive: false }
  );
};

export const setMobileScroll = (view: any) => {
  // 确保滚动区域在最顶部和最底部时，touch不会让body滚动
  if (!view.__mobile_scroll) {
    view.__mobile_scroll = true;

    view.addEventListener('touchstart', () => {
      // 计算高度是否可以滚动
      view.__can_scroll = view.scrollHeight > view.clientHeight;

      if (view.__can_scroll) {
        const scrollTop = view.scrollTop;

        if (scrollTop === 0) {
          view.scrollTop = 1;
        } else if ((scrollTop as number) + (view.offsetHeight as number) === view.scrollHeight) {
          view.scrollTop = view.scrollHeight - view.offsetHeight - 1;
        }
      }
    });

    // body整个阻止了滚动，此时整个页面都不能滚动，在需要滚动对象中拦截冒泡才可滚动
    view.addEventListener('touchmove', (e: Event) => {
      if (view.__can_scroll) {
        e.stopPropagation();
      } else {
        e.preventDefault();
      }
    });
  }
};

const setAttribute = (HTMLElement.prototype as any).setAttribute;
HTMLElement.prototype.setAttribute = function(key: string, value: string) {
  if (key === 'mobile-scroll' && value) {
    setMobileScroll(this);
  } else {
    setAttribute.call(this, key, value);
  }
};

setMobileTouch();