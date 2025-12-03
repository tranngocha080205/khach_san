// Save search preferences to localStorage
const searchForm = document.querySelector('form[role="search"]');
if (searchForm) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkDate = document.getElementById("check-date").value;
    const personCount = document.getElementById("person-count").value;
    const location = document.getElementById("location").value;

    localStorage.setItem(
      "lastSearch",
      JSON.stringify({
        checkDate,
        personCount,
        location,
      }),
    );

    alert("Search saved! Results would be displayed here.");
  });

  // Load last search from localStorage
  const lastSearch = localStorage.getItem("lastSearch");
  if (lastSearch) {
    const search = JSON.parse(lastSearch);
    if (search.checkDate)
      document.getElementById("check-date").value = search.checkDate;
    if (search.personCount)
      document.getElementById("person-count").value = search.personCount;
    if (search.location)
      document.getElementById("location").value = search.location;
  }
}
