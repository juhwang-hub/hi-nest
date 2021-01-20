import { ApiProperty } from '@nestjs/swagger';  

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

    @ApiProperty({
        type : () => String,
        title       : 'terminationAttestation',
        description : '',
        example      : 'TERMINATE',
    })
    terminationAttestation 

    @ApiProperty({
        type : () => String,
        title       : 'serverRemoteTerminationRequest',
        description : '',
        example      : 'TERMINATE',
    })
    serverRemoteTerminationRequest 
}