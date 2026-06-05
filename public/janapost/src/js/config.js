// Ключи Яндекс.Карт. Ограничены по HTTP Referer (ustores.uz, www.ustores.uz,
// localhost) в кабинете разработчика — поэтому их безопасно держать на клиенте.
// Пустая строка => этот провайдер выключен и используется фолбэк OSM/Photon.
export const CONFIG = {
  yandexSuggestKey: "8026b7d8-47d7-46d1-b2a6-2f7fa648c808",   // API Геосаджеста
  yandexGeocoderKey: "e118e024-93f6-41ca-923b-69d8dc2aa088",  // API Геокодера
};
