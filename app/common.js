/*
 * タイトル：共通処理JS
 * 説明    ：
 * 著作権  ：Copyright(c) 2013-2019 LivLog llc.
 * 会社名  ：リブログ合同会社
 * 変更履歴：2015.01.27
 *         ：新規登録
 */
//34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
var Common = {
//+----- ↓定数・変数の設定ココから -----------------------------------------------------------------+
    _className: 'Common',
    _status: '',
    STATUS_TYPE: {
        checkin: '1',
        checkout: '2',
        breakstart: '3',
        breakend: '4',
        comment: '5'
    },
//+----- ↓functionの記述ココから -----------------------------------------------------------------+
    init: function UN_init() {
        var _functionName = 'UN_init';

        try {
            Util.startWriteLog(Common._className,_functionName);
            // 処理開始
            $('input').on('keydown', function(e) {
                if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
                    return false;
                } else {
                    return true;
                }
            });

            $('.js-characters-change').blur(function(){
                Common.charactersChange($(this));
            });

            $('form').submit(function() {
                var width = document.body.scrollHeight || document.documentElement.scrollHeight
                $('.overlay').height(width);
                $('.overlay').show();
            });

            // チェックインの表示制御
            Common.showStatus();
            // 処理終了
        }
        catch (ex) {
            logger.error(ex);
        }
        finally {
            Util.endWriteLog(Common._className,_functionName);
        }
    },

    openTalk: function UN_openTalk() {
        window.open('./mike.do', '_blank');
    },

    showDialog: function UN_showDialog(id) {
        var _functionName = 'UN_showDialog',
            _dialog = null;

        try {
            Util.startWriteLog(Common._className,_functionName);
            // 処理開始
            _dialog = $(id).data('dialog');
            _dialog.open();
            // 処理終了
        }
        catch (ex) {
            logger.error(ex);
        }
        finally {
            Util.endWriteLog(Common._className,_functionName);
        }
    },

    hideDialog: function UN_hideDialog(id) {
        var _functionName = 'UN_hideDialog',
            _dialog = null;

        try {
            Util.startWriteLog(Common._className,_functionName);
            // 処理開始
            _dialog = $(id).data('dialog');
            _dialog.close();
            // 処理終了
        }
        catch (ex) {
            logger.error(ex);
        }
        finally {
            Util.endWriteLog(Common._className,_functionName);
        }
    },

    showStatus: function UN_showStatus() {
        var _functionName = 'UN_showStatus';

        try {
            Util.startWriteLog(Common._className,_functionName);
            // 処理開始
            Common._status = $('#checkinState').val();
            if (Common.STATUS_TYPE.checkin == Common._status) {
                $('select[name=selLocation]').removeAttr("disabled");
                $('select[name=selProject]').removeAttr("disabled");
                $("#header-breakstart").hide();
                $("#header-breakend").hide();
                $("#header-checkout").hide();
            } else if (Common.STATUS_TYPE.breakstart == Common._status) {
                $('select[name=selLocation]').attr("disabled", "disabled");
                $('select[name=selProject]').attr("disabled", "disabled");
                $("#header-checkin").hide();
                $("#header-breakend").hide();
            } else if (Common.STATUS_TYPE.breakend == Common._status) {
                $('select[name=selLocation]').attr("disabled", "disabled");
                $('select[name=selProject]').attr("disabled", "disabled");
                $("#header-checkin").hide();
                $("#header-breakstart").hide();
                $("#header-checkout").hide();
            }
            // 処理終了
        }
        catch (ex) {
            logger.error(ex);
        }
        finally {
            Util.endWriteLog(Common._className,_functionName);
        }
    },

    selCheckin: function UN_selCheckin(arg) {
        var _functionName = 'UN_selCheckin',
            _checkin = '';

        try {
            Util.startWriteLog(Common._className,_functionName);
            // 処理開始
//            _checkin = $('select[name=selCheckin] option:selected').val();
//            if (Common.STATUS_TYPE.checkin == Common._status) {
//                if (Common.STATUS_TYPE.comment == _checkin) {
//                    $('select[name=selLocation]').attr("disabled", "disabled");
//                    $('select[name=selProject]').attr("disabled", "disabled");
//                    $('input[name=facebookF]').prop('disabled',true);
//                    $('input[name=twitterF]').prop('disabled',true);
//                } else {
//                    $('select[name=selLocation]').removeAttr("disabled");
//                    $('select[name=selProject]').removeAttr("disabled");
//                    $('input[name=facebookF]').prop('disabled',false);
//                    $('input[name=twitterF]').prop('disabled',false);
//                }
//            } else {
//                if (Common.STATUS_TYPE.comment == _checkin) {
//                    $('input[name=facebookF]').prop('disabled',true);
//                    $('input[name=twitterF]').prop('disabled',true);
//                } else {
//                    $('input[name=facebookF]').prop('disabled',false);
//                    $('input[name=twitterF]').prop('disabled',false);
//                }
//            }
//            logger.info(_checkin);
            $('input[name=selCheckin]').val(arg);
            // 処理終了
        }
        catch (ex) {
            logger.error(ex);
        }
        finally {
            Util.endWriteLog(Common._className,_functionName);
        }
    },

    charactersChange: function UN_charactersChange(ele) {
        var _functionName = 'UN_charactersChange',
            val = null,
            han = null;

        try {
            Util.startWriteLog(Common._className,_functionName);
            // 処理開始
            val = ele.val();
            han = val.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0)});

            if(val.match(/[Ａ-Ｚａ-ｚ０-９]/g)){
                $(ele).val(han);
            }
            // 処理終了
        }
        catch (ex) {
            logger.error(ex);
        }
        finally {
            Util.endWriteLog(Common._className,_functionName);
        }
    },

    getAlerts: function UN_getAlerts() {
        var _functionName = 'UN_getAlerts',
            _unique = '';

        try {
            Util.startWriteLog(Common._className,_functionName);
            // 処理開始
            _unique = $('#unique').val();

            $.get('./getAlert.json', {unique:_unique}, function(data){
                for (var i = 0; i < data.length ; i++){
                  $.Notify({
                    timeout: 10000,
                    type: data[i].type,
                    caption: data[i].dispDatetime,
                    content: data[i].message,
                    shadow: true
                  });
                }
            });
            // 処理終了
        }
        catch (ex) {
            logger.error(ex);
        }
        finally {
            Util.endWriteLog(Common._className,_functionName);
        }
    },
};
Common.init();
