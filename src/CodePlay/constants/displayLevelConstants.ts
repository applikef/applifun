export enum DISPLAY_LEVEL {
  JUMP_NO_ATTR,
  JUMP,
  RESET,
  DELETE_AND_JUMP_STATEMENT,
  JUMP_AND_COLORS_STMTS,
  STATEMENT_GROUPS,
  SET_STROKE_WITH_PARAMS,
  TURN_NO_ATTR,
  TURN_TO_ANGLE,
  SET_STROKE_WIDTH,
  SET_PENCIL_POSITION,
  OTHER
}

export const DisplayLevelTitles = new Map<DISPLAY_LEVEL, string>([
  [DISPLAY_LEVEL.JUMP_NO_ATTR,'צִיּוּר קַו'],
  [DISPLAY_LEVEL.JUMP,'צִיּוּר קַו בְּאוֹרֶךְ נִבְחָר'],
  [DISPLAY_LEVEL.RESET,'נִיקּוּי מָסָךְ'],
  [DISPLAY_LEVEL.DELETE_AND_JUMP_STATEMENT,'מְחִיקָה וְהוֹסָפָה שֶׁל הוֹרָאוֹת'],
  [DISPLAY_LEVEL.JUMP_AND_COLORS_STMTS,'בְּחִירַת צֶבַע עִיפָּרוֹן'],
  [DISPLAY_LEVEL.STATEMENT_GROUPS,'קְבוּצוֹת שֶׁל הוֹרָאוֹת'],
  [DISPLAY_LEVEL.SET_STROKE_WITH_PARAMS,'קְבִיעַת עֵרֶךְ לְצֶבַע הָעִיפָּרוֹן'],
  [DISPLAY_LEVEL.TURN_NO_ATTR,'שִׁינּוּי כִּיווּן הָעִיפָּרוֹן לְמַעְלָה, לְמַטָּה, יָמִינָה, שְׂמֹאלָה'],
  [DISPLAY_LEVEL.TURN_TO_ANGLE,'שִׁינּוּי כִּיווּן הָעִיפָּרוֹן לְזָוִית מְסוּיֶּמֶת'],
  [DISPLAY_LEVEL.SET_STROKE_WIDTH,'קְבִיעַת עוֹבִי הָעִיפָּרוֹן'],
  [DISPLAY_LEVEL.SET_PENCIL_POSITION,'קְבִיעַת מְקוֹם הָעִיפָּרוֹן'],
]);
