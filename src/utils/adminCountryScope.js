const ADMIN_COUNTRY_SCOPE_KEY = "admin_country_scope";
export const ADMIN_COUNTRY_SCOPE_EVENT = "admin-country-scope-change";
export const DEFAULT_ADMIN_COUNTRY = "Nigeria";

export const getAdminCountryScope = () =>
  localStorage.getItem(ADMIN_COUNTRY_SCOPE_KEY) || DEFAULT_ADMIN_COUNTRY;

export const setAdminCountryScope = (country) => {
  const nextCountry = country || DEFAULT_ADMIN_COUNTRY;
  localStorage.setItem(ADMIN_COUNTRY_SCOPE_KEY, nextCountry);
  window.dispatchEvent(
    new CustomEvent(ADMIN_COUNTRY_SCOPE_EVENT, {
      detail: { country: nextCountry },
    })
  );
};
