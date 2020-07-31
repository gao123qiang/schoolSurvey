import Vue from "vue";
import { login } from "network/user";
import { getAccessToken, removeAccessToken, setAccessToken } from "utils/accessToken";
import { title, tokenName } from "config/settings"
import { resetRouter } from "router"

const state = {
  accessToken: getAccessToken(),
  username: "",
  avatar: "",
  permissions: [],
}

const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  permissions: (state) =>state.permissions,
}

