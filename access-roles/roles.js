const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
ac.grant("user")
 .readOwn("profile")
 .createOwn('profile')
 .updateOwn("profile")
 .readAny("profile")
 
ac.grant("admin")
 .extend("user")
 .updateOwn("profile")
 .deleteOwn("profile")
 .readAny("profile")
 
ac.grant("admin")
 .extend("user")
 .updateAny("profile")
 .deleteAny("profile")
 
return ac;
})();