<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo">
          <img :src="websiteConfig.loginImage" alt="登录图表" />
        </div>
        <div class="view-account-top-desc">{{ websiteConfig.loginDesc }}</div>
      </div>
      <div class="view-account-form">
        <n-form
          ref="formRef"
          label-placement="left"
          size="large"
          :model="formInline"
          :rules="rules"
        >
          <n-form-item path="username">
            <n-input v-model:value="formInline.username" placeholder="请输入用户名">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <PersonOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="formInline.password"
              type="password"
              showPasswordOn="click"
              placeholder="请输入密码"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item class="default-color">
            <div class="flex justify-between">
              <div class="flex-initial">
                <n-checkbox v-model:checked="autoLogin">自动登录</n-checkbox>
              </div>
              <!-- <div class="flex-initial order-last">
                <a href="javascript:">忘记密码</a>
              </div> -->
            </div>
          </n-form-item>
          <n-form-item>
            <n-button type="primary" @click="handleSubmit" size="large" :loading="loading" block>
              登录
            </n-button>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '@/store/modules/user';
  import { useMessage } from 'naive-ui';
  import { PageEnum } from '@/enums/pageEnum';
  import { websiteConfig } from '@/config/website.config';
  import FingerprintJS from '@fingerprintjs/fingerprintjs';
  import { encryptByAES } from '@/utils/encryp';
  interface FormState {
    userName: string;
    password: string;
    device: string;
  }

  const formRef = ref();
  const message = useMessage();
  const loading = ref(false);
  const autoLogin = ref(true);
  const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME;

  const formInline = reactive({
    username: 'admin',
    password: '123456',
    isCaptcha: true,
  });

  const rules = {
    username: { required: true, message: '请输入用户名', trigger: 'blur' },
    password: { required: true, message: '请输入密码', trigger: 'blur' },
  };

  const userStore = useUserStore();

  const router = useRouter();
  const route = useRoute();

  const getVisitorId = async () => {
    const fpPromise = FingerprintJS.load();
    const fp = await fpPromise;
    const result = await fp.get();
    return result.visitorId;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.value.validate(async (errors) => {
      if (!errors) {
        const { username, password } = formInline;
        message.loading('登录中...');
        loading.value = true;

        const device = await getVisitorId();

        const params: FormState = {
          userName: username,
          password: encryptByAES(password),
          device: encryptByAES(device),
        };

        try {
          await userStore.login(params);
          message.destroyAll();
          const toPath = decodeURIComponent((route.query?.redirect || '/') as string);

          if (route.name === LOGIN_NAME) {
            router.replace('/');
          } else router.replace(toPath);
        } finally {
          loading.value = false;
        }
      } else {
        message.error('请填写完整信息，并且进行验证码校验');
      }
    });
  };
</script>

<style lang="less" scoped>
  .view-account {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;

    &-container {
      flex: 1;
      padding: 32px 12px;
      max-width: 384px;
      min-width: 320px;
      margin: 0 auto;
    }

    &-top {
      padding: 32px 0;
      text-align: center;

      &-desc {
        font-size: 14px;
        color: #808695;
      }
    }

    &-other {
      width: 100%;
    }

    .default-color {
      color: #515a6e;

      .ant-checkbox-wrapper {
        color: #515a6e;
      }
    }
  }

  @media (min-width: 768px) {
    .view-account {
      background-image: url('../../assets/images/login.svg');
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 100%;
    }

    .page-account-container {
      padding: 32px 0 24px 0;
    }
  }
</style>
