import { ApiProperty } from '@nestjs/swagger';  

export class V2FKeyTerminated {
    @ApiProperty({
        type : () => String,
        title       : 'ownerKeyId',
        description : '',
        example      : 'owner_digital_key_id_sample',
    })
    ownerKeyId

    @ApiProperty({
        type : () => String,
        title       : 'friendKeyId',
        description : '',
        example      : 'friend_digital_key_id_sample',
    })
    friendKeyId 

    @ApiProperty({
        type : () => String,
        title       : 'status',
        description : '',
        example      : 'TERMINATED',
    })
    status 
}

export class ManageKey {
    @ApiProperty({
        type : () => String,
        title       : 'keyId',
        description : '',
        example      : 'friend_digital_key_id_sample',
    })
    keyID 

    @ApiProperty({
        type : () => String,
        title       : 'action',
        description : '',
        example      : 'TERMINATE',
    })
    action 
}