let tabList = require("./conf");
let selected = 0;
Component({
  data: {
    color: "#cdcdcd",
    selectedColor: "#f9b336",
    backgroundColor: "#ffffff",
    borderStyle: "white",
    list: tabList,
  },
  attached() {
    this.setData({
      selected,
    });
  },
  methods: {},
});
