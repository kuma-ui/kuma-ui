
type THEME = {
  components: {
    [componentName: string]: {
      variant: {
        sm: string /* className */,
        md: string /* className */,
      }
    }
  },
  tokens: {
    "colors.red.100": "red";
    "colors.blue": "blue";
    "colors.green": "green";
  }
};
