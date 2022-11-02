import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from "sinon";
import HTTPTransport from "@/src/utils/HTTPTransport";
import { expect } from "chai";
import { UserData } from "@/src/api/UserAPI";
import { DeleteUsersData } from "@/src/api/ChatsAPI";

describe("HTTPTransport", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };

    instance = new HTTPTransport("/auth");
  });

  afterEach(() => {
    requests.length = 0;
  });

  it(".get() should send GET request", () => {
    instance.get("/user");

    const [request] = requests;

    expect(request.method).to.eq("Get");
  });

  it(".post() should send POST request", () => {
    instance.post("/auth/logout");

    const [request] = requests;

    expect(request.method).to.eq("Post");
  });

  it(".put() should send PUT request", () => {
    const data: UserData = {
      first_name: "string",
      second_name: "string",
      display_name: "string",
      login: "string",
      email: "string",
      phone: "string",
    };
    instance.put("/user/profile", data);

    const [request] = requests;

    expect(request.method).to.eq("Put");
  });

  it(".delete() should send DELETE request", () => {
    const data: DeleteUsersData = {
      users: [0],
      chatId: 0,
    };

    instance.delete("/chats/users", data);

    const [request] = requests;

    expect(request.method).to.eq("Delete");
  });
});
