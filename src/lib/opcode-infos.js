import ScratchBlocks from 'scratch-blocks';

const opcode_infos = function() {
let infos = {

//
// scratch-blocks/blocks_common/colour.js
//
'colour_picker':{shape:'round',msg:'%1',args:[['COLOUR','fields','colour','slider']],},
//
// scratch-blocks/blocks_common/math.js
//
'math_number':{shape:'round',msg:'%1',args:[['NUM','fields','number']],},
'math_integer':{shape:'round',msg:'%1',args:[['NUM','fields','number']],},
'math_whole_number':{shape:'round',msg:'%1',args:[['NUM','fields','number']],},
'math_positive_number':{shape:'round',msg:'%1',args:[['NUM','fields','number']],},
'math_angle':{shape:'round',msg:'%1',args:[['NUM','fields','angle']],},
//
// scratch-blocks/blocks_common/matrix.js
//
'matrix':{shape:'round',msg:'%1',args:[['MATRIX','fields','matrix']],},
//
// scratch-blocks/blocks_common/note.js
//
'note':{shape:'round',msg:'%1',args:[['NOTE','fields','note']],},
//
// scratch-blocks/blocks_common/text.js
//
'text':{shape:'round',msg:'%1',args:[['TEXT','fields','input']],},
//
// scratch-blocks/blocks_vertical/control.js
//
'control_forever':{repeat:true,stop:true,substack:1,shape:'end',args:[['SUBSTACK','inputs','statement']],},
'control_repeat':{repeat:true,substack:1,shape:'statement',args:[['TIMES','inputs','value'],['SUBSTACK','inputs','statement']],},
'control_if':{substack:1,shape:'statement',args:[['CONDITION','inputs','value'],['SUBSTACK','inputs','statement']],},
'control_if_else':{substack:2,shape:'statement',args:[['CONDITION','inputs','value'],['SUBSTACK','inputs','statement'],['SUBSTACK2','inputs','statement']],},
'control_stop':{option:{'all':'CONTROL_STOP_ALL','this script':'CONTROL_STOP_THIS','other scripts in sprite':'CONTROL_STOP_OTHER'}},
'control_wait':{shape:'statement',args:[['DURATION','inputs','value']],},
'control_wait_until':{shape:'statement',args:[['CONDITION','inputs','value']],},
'control_repeat_until':{repeat:true,substack:1,shape:'statement',args:[['CONDITION','inputs','value'],['SUBSTACK','inputs','statement']],},
'control_while':{substack:1,shape:'statement',args:[['CONDITION','inputs','value'],['SUBSTACK','inputs','statement']],},
'control_for_each':{substack:1,shape:'statement',args:[['VARIABLE','fields','variable'],['VALUE','inputs','value'],['SUBSTACK','inputs','statement']],},
'control_start_as_clone':{shape:'hat',},
'control_create_clone_of_menu':{shape:'string',msg:'%1',args:[['CLONE_OPTION','fields','dropdown']],option:{'_myself_':'CONTROL_CREATECLONEOF_MYSELF'}},
'control_create_clone_of':{shape:'statement',args:[['CLONE_OPTION','inputs','value']],},
'control_delete_this_clone':{shape:'end',},
'control_get_counter':{shape:'number',},
'control_incr_counter':{shape:'statement',},
'control_clear_counter':{shape:'statement',},
'control_all_at_once':{substack:1,shape:'statement',args:[['SUBSTACK','inputs','statement']],},
//
// scratch-blocks/blocks_vertical/data.js
//
'data_variable':{shape:'string',msg:'%1',args:[['VARIABLE','fields','variable','getter']],},
'data_setvariableto':{shape:'statement',args:[['VARIABLE','fields','variable'],['VALUE','inputs','value']],},
'data_changevariableby':{shape:'statement',args:[['VARIABLE','fields','variable'],['VALUE','inputs','value']],},
'data_showvariable':{args:[['VARIABLE','fields','variable']],},
'data_hidevariable':{args:[['VARIABLE','fields','variable']],},
'data_listcontents':{shape:'string',msg:'%1',args:[['LIST','fields','variable','getter','list']],},
'data_listindexall':{shape:'string',msg:'%1',args:[['INDEX','fields','numberdropdown']],option:{"last":'DATA_INDEX_LAST',"all":'DATA_INDEX_ALL'}},
'data_listindexrandom':{shape:'string',msg:'%1',args:[['INDEX','fields','numberdropdown']],option:{"last":'DATA_INDEX_LAST',"random":'DATA_INDEX_RANDOM'}},
'data_addtolist':{shape:'statement',args:[['ITEM','inputs','value'],['LIST','fields','variable','list']],},
'data_deleteoflist':{shape:'statement',args:[['INDEX','inputs','value'],['LIST','fields','variable','list']],},
'data_deletealloflist':{shape:'statement',args:[['LIST','fields','variable','list']],},
'data_insertatlist':{shape:'statement',args:[['ITEM','inputs','value'],['INDEX','inputs','value'],['LIST','fields','variable','list']],},
'data_replaceitemoflist':{shape:'statement',args:[['INDEX','inputs','value'],['LIST','fields','variable','list'],['ITEM','inputs','value']],},
'data_itemoflist':{shape:'round',args:[['INDEX','inputs','value'],['LIST','fields','variable','list']],},
'data_itemnumoflist':{shape:'round',args:[['ITEM','inputs','value'],['LIST','fields','variable','list']],},
'data_lengthoflist':{shape:'number',args:[['LIST','fields','variable','list']],},
'data_listcontainsitem':{shape:'boolean',args:[['LIST','fields','variable','list'],['ITEM','inputs','value']],},
'data_showlist':{shape:'statement',args:[['LIST','fields','variable','list']],},
'data_hidelist':{shape:'statement',args:[['LIST','fields','variable','list']],},
//
// scratch-blocks/blocks_vertical/event.js
//
'event_whentouchingobject':{shape:'hat',args:[['TOUCHINGOBJECTMENU','inputs','value']],},
'event_touchingobjectmenu':{shape:'string',msg:'%1',args:[['TOUCHINGOBJECTMENU','fields','dropdown']],option:{'_mouse_':'SENSING_TOUCHINGOBJECT_POINTER','_edge_':'SENSING_TOUCHINGOBJECT_EDGE'}},
'event_whenflagclicked':{shape:'hat',},
'event_whenthisspriteclicked':{shape:'hat',},
'event_whenstageclicked':{shape:'hat',},
'event_whenbroadcastreceived':{shape:'hat',args:[['BROADCAST_OPTION','fields','variable','broadcast']],},
'event_whenbackdropswitchesto':{shape:'hat',args:[['BACKDROP','fields','dropdown']],},
'event_whengreaterthan':{shape:'hat',args:[['WHENGREATERTHANMENU','fields','dropdown'],['VALUE','inputs','value']],option:{'LOUDNESS':'EVENT_WHENGREATERTHAN_LOUDNESS','TIMER':'EVENT_WHENGREATERTHAN_TIMER'}},
'event_broadcast_menu':{shape:'string',msg:'%1',args:[['BROADCAST_OPTION','fields','variable','broadcast']],},
'event_broadcast':{shape:'statement',args:[['BROADCAST_INPUT','inputs','value']],},
'event_broadcastandwait':{shape:'statement',args:[['BROADCAST_INPUT','inputs','value']],},
'event_whenkeypressed':{shape:'hat',args:[['KEY_OPTION','fields','dropdown']],option:{'space':'EVENT_WHENKEYPRESSED_SPACE','up arrow':'EVENT_WHENKEYPRESSED_UP','down arrow':'EVENT_WHENKEYPRESSED_DOWN','right arrow':'EVENT_WHENKEYPRESSED_RIGHT','left arrow':'EVENT_WHENKEYPRESSED_LEFT','any':'EVENT_WHENKEYPRESSED_ANY'}},
//
// scratch-blocks/blocks_vertical/extensions.js
//
'extension_pen_down':{shape:'extension',msg:'%1 %2 pen down',},
'extension_music_drum':{shape:'extension',msg:'%1 %2 play drum %3',args:[['NUMBER','inputs','value']],},
'extension_wedo_motor':{shape:'extension',msg:'%1 %2 turn a motor %3',},
'extension_wedo_hat':{shape:'extension',msg:'%1 %2 when I am wearing a hat',},
'extension_wedo_boolean':{shape:'extension',msg:'%1 %2 O RLY?',},
'extension_wedo_tilt_reporter':{shape:'extension',msg:'%1 %2 tilt angle %3',args:[['TILT','inputs','value']],},
'extension_wedo_tilt_menu':{shape:'string',msg:'%1',args:[['TILT','fields','dropdown']],},
'extension_music_reporter':{shape:'extension',msg:'%1 %2 hey now, you\'re an all-star',},
'extension_microbit_display':{shape:'extension',msg:'%1 %2 display %3',args:[['MATRIX','inputs','value']],},
'extension_music_play_note':{shape:'extension',msg:'%1 %2 play note %3 for %4 beats',args:[['NOTE','inputs','value'],['BEATS','inputs','value']],},
//
// scratch-blocks/blocks_vertical/looks.js
//
'looks_sayforsecs':{shape:'statement',args:[['MESSAGE','inputs','value'],['SECS','inputs','value']],},
'looks_say':{shape:'statement',args:[['MESSAGE','inputs','value']],},
'looks_thinkforsecs':{shape:'statement',args:[['MESSAGE','inputs','value'],['SECS','inputs','value']],},
'looks_think':{shape:'statement',args:[['MESSAGE','inputs','value']],},
'looks_show':{shape:'statement',},
'looks_hide':{shape:'statement',},
'looks_hideallsprites':{shape:'statement',},
'looks_changeeffectby':{shape:'statement',args:[['EFFECT','fields','dropdown'],['CHANGE','inputs','value']],option:{'COLOR':'LOOKS_EFFECT_COLOR','FISHEYE':'LOOKS_EFFECT_FISHEYE','WHIRL':'LOOKS_EFFECT_WHIRL','PIXELATE':'LOOKS_EFFECT_PIXELATE','MOSAIC':'LOOKS_EFFECT_MOSAIC','BRIGHTNESS':'LOOKS_EFFECT_BRIGHTNESS','GHOST':'LOOKS_EFFECT_GHOST'}},
'looks_seteffectto':{shape:'statement',args:[['EFFECT','fields','dropdown'],['VALUE','inputs','value']],option:{'COLOR':'LOOKS_EFFECT_COLOR','FISHEYE':'LOOKS_EFFECT_FISHEYE','WHIRL':'LOOKS_EFFECT_WHIRL','PIXELATE':'LOOKS_EFFECT_PIXELATE','MOSAIC':'LOOKS_EFFECT_MOSAIC','BRIGHTNESS':'LOOKS_EFFECT_BRIGHTNESS','GHOST':'LOOKS_EFFECT_GHOST'}},
'looks_cleargraphiceffects':{shape:'statement',},
'looks_changesizeby':{shape:'statement',args:[['CHANGE','inputs','value']],},
'looks_setsizeto':{shape:'statement',args:[['SIZE','inputs','value']],},
'looks_size':{shape:'number',},
'looks_changestretchby':{shape:'statement',args:[['CHANGE','inputs','value']],},
'looks_setstretchto':{shape:'statement',args:[['STRETCH','inputs','value']],},
'looks_costume':{shape:'string',msg:'%1',args:[['COSTUME','fields','dropdown']],},
'looks_switchcostumeto':{shape:'statement',args:[['COSTUME','inputs','value']],},
'looks_nextcostume':{shape:'statement',},
'looks_switchbackdropto':{shape:'statement',args:[['BACKDROP','inputs','value']],},
'looks_backdrops':{shape:'string',msg:'%1',args:[['BACKDROP','fields','dropdown']],},
'looks_gotofrontback':{shape:'statement',args:[['FRONT_BACK','fields','dropdown']],option:{'front':'LOOKS_GOTOFRONTBACK_FRONT','back':'LOOKS_GOTOFRONTBACK_BACK'}},
'looks_goforwardbackwardlayers':{shape:'statement',args:[['FORWARD_BACKWARD','fields','dropdown'],['NUM','inputs','value']],option:{'forward':'LOOKS_GOFORWARDBACKWARDLAYERS_FORWARD','backward':'LOOKS_GOFORWARDBACKWARDLAYERS_BACKWARD'}},
'looks_backdropnumbername':{shape:'number',args:[['NUMBER_NAME','fields','dropdown']],option:{'number':'LOOKS_NUMBERNAME_NUMBER','name':'LOOKS_NUMBERNAME_NAME'}},
'looks_costumenumbername':{shape:'number',args:[['NUMBER_NAME','fields','dropdown']],option:{'number':'LOOKS_NUMBERNAME_NUMBER','name':'LOOKS_NUMBERNAME_NAME'}},
'looks_switchbackdroptoandwait':{shape:'statement',args:[['BACKDROP','inputs','value']],},
'looks_nextbackdrop':{shape:'statement',},
//
// scratch-blocks/blocks_vertical/motion.js
//
'motion_movesteps':{shape:'statement',args:[['STEPS','inputs','value']],},
'motion_turnright':{shape:'statement',args:[['DEGREES','inputs','value']],},
'motion_turnleft':{shape:'statement',args:[['DEGREES','inputs','value']],},
'motion_pointindirection':{shape:'statement',args:[['DIRECTION','inputs','value']],},
'motion_pointtowards_menu':{shape:'string',msg:'%1',args:[['TOWARDS','fields','dropdown']],option:{'_mouse_':'MOTION_POINTTOWARDS_POINTER','_random_':'MOTION_POINTTOWARDS_RANDOM'}},
'motion_pointtowards':{shape:'statement',args:[['TOWARDS','inputs','value']],},
'motion_goto_menu':{shape:'string',msg:'%1',args:[['TO','fields','dropdown']],option:{'_mouse_':'MOTION_GOTO_POINTER','_random_':'MOTION_GOTO_RANDOM'}},
'motion_gotoxy':{shape:'statement',args:[['X','inputs','value'],['Y','inputs','value']],},
'motion_goto':{shape:'statement',args:[['TO','inputs','value']],},
'motion_glidesecstoxy':{shape:'statement',args:[['SECS','inputs','value'],['X','inputs','value'],['Y','inputs','value']],},
'motion_glideto_menu':{shape:'string',msg:'%1',args:[['TO','fields','dropdown']],option:{'_mouse_':'MOTION_GLIDETO_POINTER','_random_':'MOTION_GLIDETO_RANDOM'}},
'motion_glideto':{shape:'statement',args:[['SECS','inputs','value'],['TO','inputs','value']],},
'motion_changexby':{shape:'statement',args:[['DX','inputs','value']],},
'motion_setx':{shape:'statement',args:[['X','inputs','value']],},
'motion_changeyby':{shape:'statement',args:[['DY','inputs','value']],},
'motion_sety':{shape:'statement',args:[['Y','inputs','value']],},
'motion_ifonedgebounce':{shape:'statement',},
'motion_setrotationstyle':{shape:'statement',args:[['STYLE','fields','dropdown']],option:{'left-right':'MOTION_SETROTATIONSTYLE_LEFTRIGHT','don\'t rotate':'MOTION_SETROTATIONSTYLE_DONTROTATE','all around':'MOTION_SETROTATIONSTYLE_ALLAROUND'}},
'motion_xposition':{shape:'number',},
'motion_yposition':{shape:'number',},
'motion_direction':{shape:'number',},
'motion_scroll_right':{shape:'statement',args:[['DISTANCE','inputs','value']],},
'motion_scroll_up':{shape:'statement',args:[['DISTANCE','inputs','value']],},
'motion_align_scene':{shape:'statement',args:[['ALIGNMENT','fields','dropdown']],option:{'bottom-left':'MOTION_ALIGNSCENE_BOTTOMLEFT','bottom-right':'MOTION_ALIGNSCENE_BOTTOMRIGHT','middle':'MOTION_ALIGNSCENE_MIDDLE','top-left':'MOTION_ALIGNSCENE_TOPLEFT','top-right':'MOTION_ALIGNSCENE_TOPRIGHT'}},
'motion_xscroll':{shape:'number',},
'motion_yscroll':{shape:'number',},
//
// scratch-blocks/blocks_vertical/operators.js
//
'operator_add':{shape:'number',args:[['NUM1','inputs','value'],['NUM2','inputs','value']],},
'operator_subtract':{shape:'number',args:[['NUM1','inputs','value'],['NUM2','inputs','value']],},
'operator_multiply':{shape:'number',args:[['NUM1','inputs','value'],['NUM2','inputs','value']],},
'operator_divide':{shape:'number',args:[['NUM1','inputs','value'],['NUM2','inputs','value']],},
'operator_random':{shape:'number',args:[['FROM','inputs','value'],['TO','inputs','value']],},
'operator_lt':{shape:'boolean',args:[['OPERAND1','inputs','value'],['OPERAND2','inputs','value']],},
'operator_equals':{shape:'boolean',args:[['OPERAND1','inputs','value'],['OPERAND2','inputs','value']],},
'operator_gt':{shape:'boolean',args:[['OPERAND1','inputs','value'],['OPERAND2','inputs','value']],},
'operator_and':{shape:'boolean',args:[['OPERAND1','inputs','value'],['OPERAND2','inputs','value']],},
'operator_or':{shape:'boolean',args:[['OPERAND1','inputs','value'],['OPERAND2','inputs','value']],},
'operator_not':{shape:'boolean',args:[['OPERAND','inputs','value']],},
'operator_join':{shape:'string',args:[['STRING1','inputs','value'],['STRING2','inputs','value']],},
'operator_letter_of':{shape:'string',args:[['LETTER','inputs','value'],['STRING','inputs','value']],},
'operator_length':{shape:'string',args:[['STRING','inputs','value']],},
'operator_contains':{shape:'boolean',args:[['STRING1','inputs','value'],['STRING2','inputs','value']],},
'operator_mod':{shape:'number',args:[['NUM1','inputs','value'],['NUM2','inputs','value']],},
'operator_round':{shape:'number',args:[['NUM','inputs','value']],},
'operator_mathop':{shape:'number',args:[['OPERATOR','fields','dropdown'],['NUM','inputs','value']],option:{'abs':'OPERATORS_MATHOP_ABS','floor':'OPERATORS_MATHOP_FLOOR','ceiling':'OPERATORS_MATHOP_CEILING','sqrt':'OPERATORS_MATHOP_SQRT','sin':'OPERATORS_MATHOP_SIN','cos':'OPERATORS_MATHOP_COS','tan':'OPERATORS_MATHOP_TAN','asin':'OPERATORS_MATHOP_ASIN','acos':'OPERATORS_MATHOP_ACOS','atan':'OPERATORS_MATHOP_ATAN','ln':'OPERATORS_MATHOP_LN','log':'OPERATORS_MATHOP_LOG','e ^':'OPERATORS_MATHOP_EEXP','10 ^':'OPERATORS_MATHOP_10EXP'}},
'operator_eval':{shape:'string',args:[['STRING','inputs','value']],},
//
// scratch-blocks/blocks_vertical/procedures.js
//
'procedures_definition':{shape:'contextmenu',args:[['custom_block','inputs','statement']],},
'procedures_call':{shape:'contextmenu',},
'procedures_prototype':{shape:'statement',},
'procedures_declaration':{shape:'statement',},
'argument_reporter_boolean':{shape:'boolean',args:[['VALUE','fields','label','serializable']],},
'argument_reporter_string_number':{shape:'string',args:[['VALUE','fields','label','serializable']],},
'argument_editor_boolean':{shape:'boolean',args:[['TEXT','fields','inputs','removable']],},
'argument_editor_string_number':{shape:'string',args:[['TEXT','fields','inputs','removable']],},
//
// scratch-blocks/blocks_vertical/sensing.js
//
'sensing_touchingobject':{shape:'boolean',args:[['TOUCHINGOBJECTMENU','inputs','value']],},
'sensing_touchingobjectmenu':{shape:'string',msg:'%1',args:[['TOUCHINGOBJECTMENU','fields','dropdown']],option:{'_mouse_':'SENSING_TOUCHINGOBJECT_POINTER','_edge_':'SENSING_TOUCHINGOBJECT_EDGE'}},
'sensing_touchingcolor':{shape:'boolean',args:[['COLOR','inputs','value']],},
'sensing_coloristouchingcolor':{shape:'boolean',args:[['COLOR','inputs','value'],['COLOR2','inputs','value']],},
'sensing_distanceto':{shape:'number',args:[['DISTANCETOMENU','inputs','value']],},
'sensing_distancetomenu':{shape:'string',msg:'%1',args:[['DISTANCETOMENU','fields','dropdown']],option:{'_mouse_':'SENSING_DISTANCETO_POINTER'}},
'sensing_askandwait':{shape:'statement',args:[['QUESTION','inputs','value']],},
'sensing_answer':{shape:'number',},
'sensing_keypressed':{shape:'boolean',args:[['KEY_OPTION','inputs','value']],},
'sensing_keyoptions':{shape:'string',msg:'%1',args:[['KEY_OPTION','fields','dropdown']],option:{'space':'EVENT_WHENKEYPRESSED_SPACE','up arrow':'EVENT_WHENKEYPRESSED_UP','down arrow':'EVENT_WHENKEYPRESSED_DOWN','right arrow':'EVENT_WHENKEYPRESSED_RIGHT','left arrow':'EVENT_WHENKEYPRESSED_LEFT','any':'EVENT_WHENKEYPRESSED_ANY'}},
'sensing_mousedown':{shape:'boolean',},
'sensing_mousex':{shape:'number',},
'sensing_mousey':{shape:'number',},
'sensing_setdragmode':{shape:'statement',args:[['DRAG_MODE','fields','dropdown']],option:{'draggable':'SENSING_SETDRAGMODE_DRAGGABLE','not draggable':'SENSING_SETDRAGMODE_NOTDRAGGABLE'}},
'sensing_loudness':{shape:'number',},
'sensing_loud':{shape:'boolean',},
'sensing_timer':{shape:'number',},
'sensing_resettimer':{shape:'statement',},
'sensing_of_object_menu':{shape:'string',msg:'%1',args:[['OBJECT','fields','dropdown']],},
'sensing_of':{shape:'round',args:[['PROPERTY','fields','dropdown'],['OBJECT','inputs','value']],option:{'x position':'SENSING_OF_XPOSITION','y position':'SENSING_OF_YPOSITION','direction':'SENSING_OF_DIRECTION','costume #':'SENSING_OF_COSTUMENUMBER','costume name':'SENSING_OF_COSTUMENAME','size':'SENSING_OF_SIZE','volume':'SENSING_OF_VOLUME','backdrop #':'SENSING_OF_BACKDROPNUMBER','backdrop name':'SENSING_OF_BACKDROPNAME'}},
'sensing_current':{shape:'number',args:[['CURRENTMENU','fields','dropdown']],option:{'YEAR':'SENSING_CURRENT_YEAR','MONTH':'SENSING_CURRENT_MONTH','DATE':'SENSING_CURRENT_DATE','DAYOFWEEK':'SENSING_CURRENT_DAYOFWEEK','HOUR':'SENSING_CURRENT_HOUR','MINUTE':'SENSING_CURRENT_MINUTE','SECOND':'SENSING_CURRENT_SECOND'}},
'sensing_dayssince2000':{shape:'number',},
'sensing_username':{shape:'number',},
'sensing_userid':{shape:'number',},
//
// scratch-blocks/blocks_vertical/sound.js
//
'sound_sounds_menu':{shape:'string',msg:'%1',args:[['SOUND_MENU','fields','dropdown']],},
'sound_play':{shape:'statement',args:[['SOUND_MENU','inputs','value']],},
'sound_playuntildone':{shape:'statement',args:[['SOUND_MENU','inputs','value']],},
'sound_stopallsounds':{shape:'statement',},
'sound_seteffectto':{shape:'statement',args:[['EFFECT','fields','dropdown'],['VALUE','inputs','value']],option:{'PITCH':'SOUND_EFFECTS_PITCH','PAN':'SOUND_EFFECTS_PAN'}},
'sound_changeeffectby':{shape:'statement',args:[['EFFECT','fields','dropdown'],['VALUE','inputs','value']],option:{'PITCH':'SOUND_EFFECTS_PITCH','PAN':'SOUND_EFFECTS_PAN'}},
'sound_cleareffects':{shape:'statement',},
'sound_changevolumeby':{shape:'statement',args:[['VOLUME','inputs','value']],},
'sound_setvolumeto':{shape:'statement',args:[['VOLUME','inputs','value']],},
'sound_volume':{shape:'number',},

};
let lang = ScratchBlocks.ScratchMsgs.currentLocale_;
let messages = ScratchBlocks.ScratchMsgs.locales[lang];
const core = {
	'argument':["",""],
	'colour':["",""],
	'control':["#E79301","#B77300"],
	'data':["#E77402","#C35600"],
    'event':["#EFAF00","#BC8900"],
	'looks':["#9966FF","#774DCB"],
	'math':["",""],
	'motion':["#4C97FF","#3373CC"],
	'operators':["#40BF4A","#389438"],
    'procedures':["#FF6680",""],
	'sensing':["#4CBFE6","#2E8EB8"],
	'sound':["#D65CD6","#BD42BD"],
	"variables":["#E77402","#C35600"],
	"myBlocks":["#FF6680","#FF4D6A"],
};

for(let cid in core) {
	let id = cid.toLowerCase()
	id = id.replace("operators", "operator");
	if(infos[id] == undefined) infos[id] = {};
	infos[id].color1 = core[cid][0];
	infos[id].color2 = core[cid][1];
}
for(let mid in messages) {
	let id = mid
	id = id.toLowerCase()
	if(id == 'sound_seteffecto')
		id = 'sound_seteffectto';
	let p = id.indexOf("_");
	if(p > 0) {
		let t = id.substr(0, p);
		if(core[t] != undefined) {
			id = id.replace("operators_", "operator_");
			if(infos[id] == undefined) infos[id] = {};
			infos[id].label = messages[mid];
		}
	}
}
return infos; };
export { opcode_infos };
