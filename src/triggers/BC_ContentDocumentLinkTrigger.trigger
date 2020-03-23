trigger BC_ContentDocumentLinkTrigger on ContentDocumentLink (after insert, before insert, after update, before update) {
    if (Trigger.isAfter) {
        if (Trigger.isUpdate) {
            BC_ContentDocumentHelper.onAfterUpdate(trigger.new, trigger.oldMap, trigger.newMap);
        } else if (Trigger.isInsert) {
            System.debug('TRIGGER ----- '+trigger.new);
            BC_ContentDocumentHelper.onAfterInsert(trigger.new, trigger.newMap);
        }
    }
    if (Trigger.isBefore) {
        if (Trigger.isUpdate) {
            BC_ContentDocumentHelper.onBeforeUpdate(Trigger.new, Trigger.oldMap);
        } else if (Trigger.isInsert) {
            BC_ContentDocumentHelper.onBeforeInsert(Trigger.new);
        }
    }
}