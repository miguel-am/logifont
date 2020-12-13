const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant("user")
    .readOwn("profile")
    .createOwn("profile")
    .updateOwn("profile")
    .readAny("profile");
  ac.deny("user").deleteOwn("profile");
  ac.grant("admin")
    .readAny("profile")
    .deleteOwn("profile")
    .createOwn("profile")
    .updateOwn("profile");

  ac.grant("admin").extend("user").updateAny("profile").deleteAny("profile");

  return ac;
})();
