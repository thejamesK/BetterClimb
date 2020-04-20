public with sharing class BC_PricebookUtils {
    private static final String STANDARD_PRICEBOOK_NAME = 'Standard Price Book';
    private List<PricebookEntry> pricebookEntries;
    private PricebookEntry standardPriceBook;
    private PricebookEntry discountPriceBook;

    public BC_PricebookUtils(List<PricebookEntry> lstpbe){
        this.pricebookEntries = lstpbe;
        pricebookProcessing();
    }

    public Boolean isStandardPricebook(){
        return standardPriceBook != null;
    }

    public PricebookEntry getStandardPricebook(){
        return this.standardPriceBook;
    }

    public Boolean isDiscountPricebook(){
        return discountPriceBook != null;
    }

    public PricebookEntry getDiscountPricebook(){
        return this.discountPriceBook;
    }

    private void pricebookProcessing(){
        Decimal discountPrice;
        for(PricebookEntry pbe : pricebookEntries){
            if(pbe.Pricebook2.Name == STANDARD_PRICEBOOK_NAME) {
                standardPriceBook = pbe;
            } else {
                if(discountPrice == null || discountPrice > pbe.UnitPrice) {
                    discountPriceBook = pbe;
                    discountPrice = pbe.UnitPrice;
                }
            }
        }
    }

}