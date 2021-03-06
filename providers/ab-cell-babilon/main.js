﻿/**
Провайдер AnyBalance (http://any-balance-providers.googlecode.com)
*/

var g_headers = {
	'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
	'Accept-Charset': 'windows-1251,utf-8;q=0.7,*;q=0.3',
	'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4',
	'Connection': 'keep-alive',
	'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.76 Safari/537.36',
};

function main() {
	var html = AnyBalance.requestGet('http://welcome.babilon-m.tj/index.php', g_headers);
	
	if(!html || AnyBalance.getLastStatusCode() > 400){
		AnyBalance.trace(html);
		throw new AnyBalance.Error('Ошибка при подключении к сайту провайдера! Попробуйте обновить данные позже.');
	}
	
	var result = {success: true};
	
	getParam(html, result, 'num', /Ваш номер(?:[^>]*>){4}([^<]+)/i, replaceTagsAndSpaces, parseBalance);
	getParam(html, result, 'balance', /Баланс(?:[^>]*>){4}([^<]+)/i, replaceTagsAndSpaces, parseBalance);
	getParam(html, result, '__tariff', /Тариф(?:[^>]*>){4}([^<]+)/i, replaceTagsAndSpaces, parseBalance);

	getParam(html, result, 'cell', /Оплаченные минуты(?:[^>]*>){4}[^>]*ост\.([^<]+)/i, replaceTagsAndSpaces, parseBalance);
	getParam(html, result, 'traff', /Оплаченный трафик(?:[^>]*>){4}[^>]*ост\.([^<]+)/i, replaceTagsAndSpaces, parseBalance);
	getParam(html, result, 'sms', /Оплаченные СМС(?:[^>]*>){4}[^>]*ост\.([^<]+)/i, replaceTagsAndSpaces, parseBalance);

	getParam(html, result, 'mobi_cell', /MobiGPRS(?:[^>]*>){4}[^>]*ост\.([^<]+)/i, replaceTagsAndSpaces, parseBalance);
	getParam(html, result, 'mobi_traff', /MobiМИНУТЫ(?:[^>]*>){4}[^>]*ост\.([^<]+)/i, replaceTagsAndSpaces, parseBalance);
	getParam(html, result, 'mobi_sms', /MobiSMS(?:[^>]*>){4}[^>]*ост\.([^<]+)/i, replaceTagsAndSpaces, parseBalance);
	
	AnyBalance.setResult(result);
}