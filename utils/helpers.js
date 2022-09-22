module.exports = {
  format_date: (date) => {
    if (date) {
      // Format date as MM/DD/YYYY
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    } else {
      return "Date is invalid";
    }
  },
};
