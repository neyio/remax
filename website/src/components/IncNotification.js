import React, { useEffect, useRef } from 'react';
import fetch from 'isomorphic-fetch';
import { notification, Button, Icon } from 'antd';

const HIDE_KEY = 'hide-inc-notification';

const IncNotification = () => {
  const handleHide = () => {
    notification.close('inc-notification');
    window.localStorage.setItem(HIDE_KEY, '1');
  };

  useEffect(() => {
    const hide = window.localStorage.getItem(HIDE_KEY);
    if (hide) {
      return;
    }
    fetch('https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/rmsportal/FlPJSPwhzfagtBoHKCbu.png')
      .then(res => {
        if (res.status === 200) {
          notification.info({
            key: 'inc-notification',
            message: '🐜 内网用户提醒',
            description: (
              <div>
                <p>发现你是内网用户，请查看 Remax 内部开发指南。</p>
                <div style={{ textAlign: 'right' }}>
                  <Button
                    size="small"
                    type="primary"
                    style={{ marginRight: 8 }}
                    href="https://ur.alipay.com/1koJMs"
                    target="_blank"
                  >
                    <Icon type="thunderbolt" /> 立即查看
                  </Button>
                  <Button size="small" onClick={handleHide}>
                    不再提醒
                  </Button>
                </div>
              </div>
            ),
            placement: 'bottomRight',
            duration: 0,
          });
        }
      })
      .catch(() => {
        // ignore
      });
  }, []);

  return null;
};

export default IncNotification;
