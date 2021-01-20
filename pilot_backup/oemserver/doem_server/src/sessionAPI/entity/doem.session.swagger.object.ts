import { ApiProperty } from '@nestjs/swagger';  
 

export class GenerateSharingSession {
    @ApiProperty({
        type : () => String,
        title       : 'KeyId',
        description : 'Generation Shared Session API Test <br />' 
                    + '@Max Length(bytes) : 128 <br />' 
                    + '@Description       : The Key Identifier <br />'
                    + '@Required          : Mandatory', 
        example     : 'owner_digital_key_id_sample'
    })
    KeyId : '';
}

export class RedeemSharingSession { 
    @ApiProperty({
        type : () => String,
        title : 'sharingSession',
        description : 'The object of the sharing session <br />' 
                    + '@Max Length(bytes) : 128 <br />' 
                    + '@Description       : The Key Identifier <br />'
                    + '@Required          : Mandatory',
        example     : '{"sessionID":""}'
    })
    sharingSession : '';

    @ApiProperty({
        type : () => String,
        title : 'friendDeviceHandle',
        description : 'the object of the friendDeviceHandle <br />' 
                    + '@Max Length(bytes) : 128 <br />' 
                    + '@Description       : The Key Identifier <br />'
                    + '@Required          : Mandatory',
        example     : 'c4iC-v1ZTMKwH8oZGeybVJ:APA91bHcjGv-jgziN4Ip76U54YsWT8169e1ydWuhVOEcAZY2ZXhxlikZdR4VMzfGGUp428tRWcSmy3g5v96NrJPHNJnOU7XNbiXcPzAqGYbCLpCV0kz3L9s0zS9Ja-zno9zBfyrSN9Lu' 
    })
    friendDeviceHandle : '';
}

export class CancelSharingSession {
    @ApiProperty({
        type : () => String,
        title : 'sharingSession',
        description : 'The object of the sharing session <br />' 
                    + '@Max Length(bytes) : 128 <br />' 
                    + '@Description       : The Key Identifier <br />'
                    + '@Required          : Mandatory',  
        example     : '{"sessionID":""}'
    })
    sharingSession : '';
}

export class EventNotification {
    @ApiProperty({
        type : () => String,
        title : 'KeyId',
        description : 'The object of the sharing session <br />' 
                    + '@Max Length(bytes) : 128 <br />' 
                    + '@Description       : The Key Identifier <br />'
                    + '@Required          : Mandatory',  
        example     : '' 
    })
    KeyId : '';

    @ApiProperty({
        title : 'eventType',
        type : () => String,
        description : 'The object of the sharing session <br />' 
                    + '@Max Length(bytes) : 128 <br />' 
                    + '@Description       : The Key Identifier <br />'
                    + '@Required          : Mandatory',   
        example     : ''
    })
    eventType : '';

    @ApiProperty({
        title : 'eventData',
        type : () => String,
        description : 'The object of the sharing session <br />' 
                    + '@Max Length(bytes) : 128 <br />' 
                    + '@Description       : The Key Identifier <br />'
                    + '@Required          : Mandatory',  
        example     : ''
    })
    eventData : '';
}

export class CreateSharedKey {
    @ApiProperty({
        title       : 'KeyAction',
        type : () => String,
        description : 'Generation Shared Session API Test <br />' 
                    + '@Max Length(bytes) : 128 <br />' 
                    + '@Description       : The Key Identifier <br />'
                    + '@Required          : Mandatory', 
        example     : 'CREATE_SHARED_KEY, SIGN_SHARED_KEY, IMPORT_SHARED_KEY' 
    })
    keyAction
    @ApiProperty({
        title       : 'KeyId',
        type : () => String,
        description : 'Generation Shared Session API Test <br />' 
                    + '@Max Length(bytes) : 128 <br />' 
                    + '@Description       : The Key Identifier <br />'
                    + '@Required          : Mandatory', 
        example     : 'owner_digital_key_id_sample' 
    })
    keyID
    @ApiProperty({
        type : () => String,
        title : 'sharingSession',
        description : 'The object of the sharing session <br />' 
                    + '@Max Length(bytes) : 128 <br />' 
                    + '@Description       : The Key Identifier <br />'
                    + '@Required          : Mandatory',  
        example     : '{"sessionID":""}'
    })
    sharingSession : '';
    @ApiProperty({
        title       : 'keyCreationRequest',
        type : () => String,
        description : 'Generation Shared Session API Test <br />' 
                    + '@Max Length(bytes) : 128 <br />' 
                    + '@Description       : The Key Identifier <br />'
                    + '@Required          : Mandatory', 
        example     : '7F3159F621560CBD2D33ADFF5E1BE4F7566760CBD2D33ADFF55E201A030820145A00302010202083A0751A60622AF621560CBD2D30145A' 
    })
    keyCreationRequest;

    @ApiProperty({
        title       : 'keySigingRequest',
        type : () => String,
        description : 'Generation Shared Session API Test <br />' 
                    + '@Max Length(bytes) : 128 <br />' 
                    + '@Description       : The Key Identifier <br />'
                    + '@Required          : Mandatory', 
        example     : '7F3659F621560CBD2D33ADFF5E1BE4F7566760CBD2D33ADFF55E201A030820145A0030201083A0751A60622A86E1BE4FF621563ADFF55E201A0' 
    })
    keySigingRequest

    @ApiProperty({
        title       : 'importRequest',
        type : () => String,
        description : 'Generation Shared Session API Test <br />' 
                    + '@Max Length(bytes) : 128 <br />' 
                    + '@Description       : The Key Identifier <br />'
                    + '@Required          : Mandatory', 
        example     : '7F3259F621560CBD2D33ADFF5E1BE4F7566760CBD2D33ADFF55E201A030820145A00302010202083A0751A60622A86E1BE4FF621560CBD760CBD2D33' 
    })
    importRequest

}