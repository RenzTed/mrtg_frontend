import axios from "axios";
import { Buffer } from "buffer";

const martgApi = axios.create({
  baseURL: process.env.url.MRTG_BACK_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const mrtgFrontApi = axios.create({
  //try for image controller
  baseURL: process.env.url.MRTG_FRONT_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const martgUrl = axios.create({
  baseURL: process.env.url.MRTG_URL,
  headers: {
    "Content-Type": "application/json",
    Token: process.env.header.DAX_TOKEN,
    Identity: process.env.header.DAX_IDENTITY,
  },
});

const apiUrl = axios.create({
  baseURL: process.env.url.MRTG_FRONT_URL,
});

const createGraph = axios.create({
  baseURL: process.env.url.MRTG_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const mrtgBackApi = axios.create({
  baseURL: process.env.url.MRTG_BACK_URL,
  headers: {
    "Content-Type": "application/json",
    Token: process.env.header.MRTG_TOKEN,
    Identity: process.env.header.MRTG_IDENTITY,
  },
});

const daxApi = axios.create({
  baseURL: process.env.url.DAX_URL,
  headers: {
    "Content-Type": "application/json",
    Token: process.env.header.DAX_TOKEN,
    Identity: process.env.header.DAX_IDENTITY,
  },
});

export const getImageFile = async (imageNameReq) => {
  try {
    const { data } = await mrtgFrontApi.post(
      "/api/graph/image",
      { imageName: imageNameReq },
      {
        responseType: "arraybuffer",
      }
    );
    // console.log(data);
    const image = new Buffer.from(data, "binary").toString("base64");
    return `data:image/png;base64, ${image}`;
  } catch (err) {
    // return err;
  }
};

export default {
  mrtg: {
    userLogin(payload) {
      return martgApi.post("api/login_check", payload);
    },
    userLoad(token) {
      return martgApi.get("api/mrtg/user", {
        headers: { Authorization: "Bearer " + token },
      });
    },

    createDaxGraph(payload) {
      return martgApi.get("api/dax_create_graph");
    },
    createGraph(payload) {
      return mrtgBackApi.get("api/dax/create_graph/all", payload);
    },

    userRegister(payload) {
      return apiUrl.post("api/register", payload);
    },
    userOtp(payload) {
      return apiUrl.post("/api/otp", payload);
    },
    userVerifyOtp(payload) {
      return apiUrl.post("/api/verify_otp", payload);
    },
    userGetLocations() {
      return apiUrl.get("/api/locations");
    },
    userGetTowerName(payload) {
      return apiUrl.post("/api/tower_name", payload);
    },
    userGetIpMacDax(payload) {
      return apiUrl.post("/api/get_ip_mac_dax", payload);
    },
    userModalStatus(token) {
      return accountsApi.put(
        "/update_modal_status",
        {},
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
    },
    userAutoRenewStatus(token) {
      return accountsApi.put(
        "/update_auto_renew_status",
        {},
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
    },
    userPortalTransaction(token, startDate, dateNow) {
      return accountsApi.get(
        `/transaction/wallet/get/${startDate}/${dateNow}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
    },
    userPortalTransactionDefault(token) {
      return accountsApi.get(`/transaction/wallet/get/default`, {
        headers: { Authorization: "Bearer " + token },
      });
    },
    userForgotPassword(payload) {
      return apiUrl.post("/api/forgot_password", payload);
    },
    userChangeContactNumber(contactNumber, token) {
      return accountsApi.post(
        "/update_contact_number",
        { contactNumber },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
    },
    userUpdateEmail(email, token) {
      return accountsApi.post(
        "/update_email",
        { email },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
    },
    userUpdateUnit(unitNumber, token) {
      return accountsApi.put(
        "/update_unit",
        { unitNumber },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
    },
    userUpdateTowerName(towerName, token) {
      return accountsApi.put(
        "/update_tower_name",
        { towerName },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
    },
    userChangePassword(oldPassword, newPasswordConfirm, token) {
      return accountsApi.post(
        "/change_password",
        { oldPassword, newPasswordConfirm },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
    },
    userUpdateAddress(address, token) {
      return accountsApi.put(
        "/update_address",
        { address },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
    },
  },

  dax: {
    daxIp() {
      return daxApi.get("api/dax");
    },
    daxCreateGraph(payload) {
      return mrtgBackApi.get("api/dax/create_graph/all", payload);
    },
  },

  actions: {
    home(payload) {
      return apiUrl.post("/api/user_load", payload);
    },
    transfer(payload) {
      return apiUrl.post("/api/transfer", payload);
    },
    activate(payload) {
      return apiUrl.post("/api/activate", payload);
    },
    queue(payload) {
      return apiUrl.post("/api/queue", payload);
    },
    queueActivate(payload) {
      return apiUrl.post("/api/queue_activate", payload);
    },
  },

  // mrtg: {
  //   createMrtgGraph(payload) {
  //     return apiUrl.post("/api/create_mrtg_graph", payload);
  //   },
  // },
};
