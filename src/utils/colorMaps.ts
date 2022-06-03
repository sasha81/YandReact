export const statusMap= new Map<string,string>();
statusMap.set("done","Выполнен");
statusMap.set("created","Готовиться");
statusMap.set("pending","Отменен");

export const colorMap = new Map<string,string>();
colorMap.set("done","green");
colorMap.set("created","white");
colorMap.set("pending","red");