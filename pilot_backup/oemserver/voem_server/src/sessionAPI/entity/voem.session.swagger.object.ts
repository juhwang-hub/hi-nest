import { ApiProperty } from '@nestjs/swagger';  

export class GenerateSharingSession {
    @ApiProperty({
        type : () => String,
        title       : 'KeyId',
        description : 'Generation Shared Session API Test <br />' 
                    + '@Max Length(bytes) : 128 <br />' 
                    + '@Description       : The Key Identifier <br />'
                    + '@Required          : Mandatory',
        default     : 'owner_digital_key_id_sample',
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
        default     : '{}'
    })
    sharingSession : '';

    @ApiProperty({
        type : () => String,
        description : 'the object of the friendDeviceHandle <br />' 
                    + '@Max Length(bytes) : 128 <br />' 
                    + '@Description       : The Key Identifier <br />'
                    + '@Required          : Mandatory',
        title : 'friendDeviceHandle'
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
        default     : '13455143253333343542245c4de36'
    })
    sharingSession : '';
}

export class EventNotification {
    @ApiProperty({
        type : () => String,
        description : 'The object of the sharing session <br />' 
                    + '@Max Length(bytes) : 128 <br />' 
                    + '@Description       : The Key Identifier <br />'
                    + '@Required          : Mandatory',  
        title : 'KeyId'
    })
    KeyId : '';

    @ApiProperty({
        type : () => String,
        description : 'The object of the sharing session <br />' 
                    + '@Max Length(bytes) : 128 <br />' 
                    + '@Description       : The Key Identifier <br />'
                    + '@Required          : Mandatory',  
        title : 'eventType'
    })
    eventType : '';

    @ApiProperty({
        type : () => String,
        description : 'The object of the sharing session <br />' 
                    + '@Max Length(bytes) : 128 <br />' 
                    + '@Description       : The Key Identifier <br />'
                    + '@Required          : Mandatory',  
        title : 'eventData'
    })
    eventData : '';
}
/*
 @Body('keyID')              keyID: string,
        @Body('sharingSession')     sharingSession: string,
        @Body('keyCreationRequest') keyCreationRequest: string,
        @Body('keySigingRequest')   keySigingRequest: string,
        @Body('importRequest')      importRequest: string,
*/
export class keySharingExchange{
    @ApiProperty({
        type : () => String,
        title : 'keyAction',
        description : 'KeyAction <br />' 
                    + '@Max Length(bytes) : 128 <br />' 
                    + '@Description       : The Key Identifier <br />'
                    + '@Required          : Mandatory',  
        default     : 'importRequest',
        example     : 'importRequest' 
    })
    keyAction : '';
    
    @ApiProperty({
        type : () => String,
        title : 'KeyId',
        description : 'The object of the sharing session <br />' 
                    + '@Max Length(bytes) : 128 <br />' 
                    + '@Description       : The Key Identifier <br />'
                    + '@Required          : Mandatory',  
        default     : '13455143253333343542245c4de36',
        example     : 'owner_digital_key_id_sample' 
    })
    KeyId : '';

    @ApiProperty({
        type : () => String,
        title : 'keyCreationRequest',
        description : 'The object of the sharing session <br />' 
                    + '@Max Length(bytes) : 128 <br />' 
                    + '@Description       : The Key Identifier <br />'
                    + '@Required          : Mandatory',  
        default     : 'CREATE_SHARED_KEY',
        example     : '7F3159F621560CBD2D33ADFF5E1BE4F7566760CBD2D33ADFF55E201A030820145A00302010202083A0751A60622A86E1BE4FF621560CBD2D33A' 
    })
    keyCreationRequest : '';

    @ApiProperty({
        type : () => String,
        title : 'keySigningRequest',
        description : 'The object of the sharing session <br />' 
                    + '@Max Length(bytes) : 128 <br />' 
                    + '@Description       : The Key Identifier <br />'
                    + '@Required          : Mandatory',  
        default     : 'keySigningRequest',
        example     : '7F3659F621560CBD2D33ADFF5E1BE4F7566760CBD2D33ADFF55E201A030820145A00302010202083A0751A60622A86E1BE4FF621560CBD2D33A' 
    })
    keySigningRequest : '';

    @ApiProperty({
        type : () => String,
        title : 'importRequest',
        description : 'The object of the sharing session <br />' 
                    + '@Max Length(bytes) : 128 <br />' 
                    + '@Description       : The Key Identifier <br />'
                    + '@Required          : Mandatory',  
        default     : 'importRequest',
        example     : '7F3259F621560CBD2D33ADFF5E1BE4F7566760CBD2D33ADFF55E201A030820145A00302010202083A0751A60622A86E1BE4FF621560CBD2D33A' 
    })
    importRequest : '';
}