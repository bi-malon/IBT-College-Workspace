const select = document.querySelector("#lang");
const saved = localStorage.getItem("lang");
if (saved) select.value = saved;
select.addEventListener("change", () => {
  localStorage.setItem("lang", select.value);
});
